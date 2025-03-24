// Utility functions for files.

import fs from "fs";
import path from "path";

export function getImageFiles(folderPath: string): string[] {
  // Reads the folder and filters for image files.
  const files = fs.readdirSync(folderPath);
  return files.filter((file) => /\.(png|jpe?g|gif)$/i.test(file));
}

export function getFilePath(folder: string, filename: string): string {
  // Builds an absolute path from folder + filename.
  return path.join(folder, filename);
}
