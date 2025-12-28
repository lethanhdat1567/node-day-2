import fs from "fs";
import fsPromises from "fs/promises";
import path from "path"; // phải import path

const dbDir = path.join(process.cwd(), "db");

function getDBPath(resourceName) {
    return path.join(dbDir, `${resourceName}.json`);
}

export async function loadDB(resourceName) {
    const filePath = path.join(dbDir, `${resourceName}.json`);

    try {
        const data = await fsPromises.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            if (!fs.existsSync(dbDir)) {
                fs.mkdirSync(dbDir, { recursive: true });
            }
            await fsPromises.writeFile(filePath, "[]", "utf-8");
        }
        return [];
    }
}

export async function saveDB(resourceName, data) {
    const filePath = getDBPath(resourceName);

    // Tạo folder /db nếu chưa tồn tại
    if (!fs.existsSync(dbDir)) {
        fs.mkdirSync(dbDir, { recursive: true });
    }

    // Ghi dữ liệu vào file JSON
    await fsPromises.writeFile(
        filePath,
        JSON.stringify(data, null, 2),
        "utf-8"
    );
}
