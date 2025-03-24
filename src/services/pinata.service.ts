import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { FormData } from "formdata-node";
import { fileFromPath } from "formdata-node/file-from-path";
import { FormDataEncoder } from "form-data-encoder";
import { request } from "undici";
import progress from "progress-stream";
import cliProgress from "cli-progress";
import { config } from "../config/env";
import { getImageFiles, getFilePath } from "../utils/fileUtils";

function formatBytes(bytes: number): string {
  const mb = bytes / 1024 / 1024;
  const gb = mb / 1024;
  if (gb >= 1) return `${gb.toFixed(2)} GB`;
  return `${mb.toFixed(2)} MB`;
}

function formatSeconds(seconds: number): string {
  if (!isFinite(seconds)) return "∞";
  const s = Math.round(seconds);
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
}

export async function uploadFolderToPinata(): Promise<void> {
  const files = getImageFiles(config.uploadFolder);

  if (files.length === 0) {
    console.log("No images found in folder:", config.uploadFolder);
    return;
  }

  const form = new FormData();
  const successfulFiles: string[] = [];
  const failedFiles: { file: string; error: string }[] = [];

  for (const file of files) {
    const fullPath = getFilePath(config.uploadFolder, file);
    const relativePath = path.join(config.pinataCloudFolder, file);

    try {
      const fileBlob = await fileFromPath(fullPath);
      form.append("file", fileBlob, relativePath);
      successfulFiles.push(relativePath);
      console.log(`✅ Added: ${relativePath}`);
    } catch (err: any) {
      failedFiles.push({ file: relativePath, error: err.message });
      console.error(`❌ Failed to add: ${relativePath} — ${err.message}`);
    }
  }

  if (successfulFiles.length === 0) {
    console.error("🚫 No valid files to upload. Aborting.");
    return;
  }

  form.append(
    "pinataOptions",
    JSON.stringify({
      wrapWithDirectory: true,
      pinataMetadata: { name: config.pinataCloudFolder },
    })
  );

  const encoder = new FormDataEncoder(form);
  const encodedStream = Readable.from(encoder.encode());
  const contentLength = encoder.contentLength
    ? parseInt(encoder.contentLength, 10)
    : 0;

  const progressBar = new cliProgress.SingleBar(
    {
      format:
        "Uploading [{bar}] {percentage}% | {transferred} / {length} | {speed}/s | ETA: {eta} seconds",
      barCompleteChar: "#",
      barIncompleteChar: ".",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic
  );

  let lastTransferred = 0;

  const progressStream = progress({
    length: contentLength,
    time: 500,
  });

  progressStream.on("progress", (p) => {
    lastTransferred = p.transferred;
    progressBar.update(p.transferred, {
      transferred: formatBytes(p.transferred),
      length: formatBytes(p.length),
      speed: formatBytes(p.speed),
      eta: formatSeconds(p.eta),
    });
  });

  progressStream.on("end", () => {
    progressBar.update(contentLength, {
      transferred: formatBytes(contentLength),
      length: formatBytes(contentLength),
      speed: "0 MB",
      eta: "0s",
    });
    progressBar.stop();
  });

  // Start progress bar just before piping
  progressBar.start(contentLength, 0);

  const streamingBody = encodedStream.pipe(progressStream);

  try {
    const res = await request(config.pinataApiUrl, {
      method: "POST",
      body: streamingBody,
      headers: {
        ...encoder.headers,
        Authorization: `Bearer ${config.pinataJwt}`,
      },
    });

    const responseText = await res.body.text();
    const responseJson = JSON.parse(responseText);

    const ipfsHash = responseJson.IpfsHash;
    const gatewayUrl = `https://${config.gatewayUrl}/ipfs/${ipfsHash}`;

    console.log("\n✅ Upload successful.");
    console.log("📁 Directory CID:", ipfsHash);
    console.log("🌐 Gateway URL:", gatewayUrl);
    console.log("\n📂 Uploaded files:");

    successfulFiles.forEach((f) => console.log(`- ${gatewayUrl}/${f}`));

    if (failedFiles.length > 0) {
      console.log("\n⚠️ Some files failed to be added:");
      failedFiles.forEach((f) => {
        console.log(`- ${f.file}: ${f.error}`);
      });
    }

    console.log("\nDone.");
  } catch (error: any) {
    progressBar.stop();

    console.error("\n🚨 Upload failed.");
    console.error("🧾 Stage: Streaming upload to Pinata");
    console.error("🗂️ Files added to FormData:", successfulFiles.length);
    console.error(
      "📦 Last file added:",
      successfulFiles[successfulFiles.length - 1]
    );
    console.error(
      "📊 Last recorded upload progress:",
      formatBytes(lastTransferred)
    );

    if (error.response) {
      console.error("Pinata responded with an error:");
      console.error("Status code:", error.response.status);
      console.error("Response body:", error.response.data);
    } else if (error.request) {
      console.error("No response received from Pinata.");
    }

    console.error("Raw error:", error.message);
    throw error;
  }
}
