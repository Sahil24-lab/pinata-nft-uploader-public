import { config } from "./config/env";
import { logger } from "./utils/logger";

async function start() {
  if (config.isLocal) {
    logger.log("🧪 Starting mock server in local mode...");
    await import("./scripts/tests/mockServer");
  }

  const { runUpload } = await import("./scripts/uploadFolder");
  await runUpload();
}

start().catch((err) => {
  logger.error("❌ Script failed:", err);
  process.exit(1);
});
