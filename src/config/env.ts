// Loads environment variables and provides typed config.

import dotenv from "dotenv";

dotenv.config(); // rest of code here

export const config = {
  pinataJwt: process.env.PINATA_JWT || "",
  pinataApiUrl:
    process.env.PINATA_API_URL ||
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
  gatewayUrl: process.env.DEDICATED_GATEWAY || "",
  uploadFolder: process.env.UPLOAD_FOLDER || "./input_images",
  pinataCloudFolder: process.env.PINATA_CLOUD_FOLDER || "default_folder_name",
};
