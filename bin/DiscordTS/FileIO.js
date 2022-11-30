"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
class FileIO {
    /**
     * Read all files in that directory and subdirectories
     * @param path The path to the directory to read.
     */
    static GetAllFiles(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const subdirs = yield (0, promises_1.readdir)(path);
            const files = yield Promise.all(subdirs.map((subdir) => __awaiter(this, void 0, void 0, function* () {
                const res = (0, path_1.resolve)(path, subdir);
                return (yield (0, promises_1.stat)(res)).isDirectory() ? FileIO.GetAllFiles(res) : res;
            })));
            return files.map((file) => file).flat();
        });
    }
}
exports.default = FileIO;
