import { readdirSync } from "fs";
import { readdir, stat } from "fs/promises";
import { resolve } from "path";

export default class FileIO
{

    /**
     * Read all files in that directory and subdirectories
     * @param dir The path to the directory to read.
     */
    public static async GetAllFiles(dir : string) : Promise<string | string[]>
    {
        const subdirs = await readdir(dir);
        const files = await Promise.all(subdirs.map(async (subdir) => {

            const res = resolve(dir, subdir);
            return (await stat(res)).isDirectory() ? FileIO.GetAllFiles(res) : res;

        }));

        return files.map((file) => file).flat();
    }

}