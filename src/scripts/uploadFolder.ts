import { uploadFolderToPinata } from "../services/pinata.service";

uploadFolderToPinata()
  .then(() => {
    console.log("Done.");
  })
  .catch((err) => {
    console.error("Error uploading folder:", err?.message || err);
    process.exit(1);
  });
