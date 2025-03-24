import { uploadFolderToPinata } from "../services/pinata.service";
import { logger } from "../utils/logger";

(async () => {
  try {
    await uploadFolderToPinata();
    logger.log("✅ Done.");
  } catch (err: any) {
    logger.error("❌ Error uploading folder:", err?.message || err);
    process.exit(1);
  }
})();
