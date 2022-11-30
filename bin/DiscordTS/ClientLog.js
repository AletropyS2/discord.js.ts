"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rc = "\x1b[31m"; // Red
const gc = "\x1b[32m"; // Green
const yc = "\x1b[33m"; // Yellow
const oc = "\x1b[34m"; // Orange 
const rsc = "\x1b[0m"; // Reset color
class ClientLog {
    static Log(value) {
        console.log(`${gc}( DISCORD.TS | LOG) ->${rsc} ${value}`);
    }
    static Warn(value) {
        console.log(`${yc}( DISCORD.TS | WARN) ->${rsc} ${value}`);
    }
    static Error(value) {
        console.log(`${rc}( DISCORD.TS | ERROR) ->${rsc} ${value}`);
    }
    static Info(value) {
        console.log(`${oc}( DISCORD.TS | INFO) ->${rsc} ${value}`);
    }
}
exports.default = ClientLog;
