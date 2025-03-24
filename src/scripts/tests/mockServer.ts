import express from "express";
import multer from "multer";
import { logger } from "../../utils/logger";

const app = express();
const upload = multer({ dest: "mock_uploads/" });

app.post("/upload", upload.any(), (req, res) => {
    logger.log("📦 Received files:", req.files?.length);
  setTimeout(() => {
    res.json({
      IpfsHash: "QmFakeHashForTestingOnly1234567890",
    });
  }, 5000); // Simulate slow Pinata response
});

app.listen(4000, () => {
    logger.log("🚀 Mock Pinata server listening at http://localhost:4000");
});
