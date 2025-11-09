// backend/utils/fileDb.js
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Base directory for data storage
const dataDir = path.join(__dirname, "../data");

export async function readData(fileName) {
  const filePath = path.join(dataDir, fileName);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function writeData(fileName, data) {
  const filePath = path.join(dataDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}
