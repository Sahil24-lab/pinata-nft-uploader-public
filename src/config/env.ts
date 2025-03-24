import dotenv from "dotenv";

dotenv.config();

export const config = {
  pinataJwt: process.env.PINATA_JWT || "",
  pinataApiUrl:
    process.env.PINATA_API_URL ||
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
  gatewayUrl: process.env.DEDICATED_GATEWAY || "",
  uploadFolder: process.env.UPLOAD_FOLDER || "./input_files",
  pinataCloudFolder: process.env.PINATA_CLOUD_FOLDER || "default_folder_name",
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV || "development",
  isLocal: process.env.NEXT_PUBLIC_NODE_ENV === "local",
  isDev: ["local", "development"].includes(
    process.env.NEXT_PUBLIC_NODE_ENV || ""
  ),
};
