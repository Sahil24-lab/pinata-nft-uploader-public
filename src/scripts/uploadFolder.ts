import { uploadFolderToPinata } from "../services/pinata.service";
import { logger } from "../utils/logger";

export async function runUpload() {
  try {
    await uploadFolderToPinata();
    logger.log("✅ Done.");
  } catch (err: any) {
    logger.error("❌ Error uploading folder:", err?.message || err);
    process.exit(1);
  }
}
