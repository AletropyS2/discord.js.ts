"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TSClient_1 = __importDefault(require("./DiscordTS/TSClient"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // Load .env file
const bot = new TSClient_1.default({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages"
    ]
});
bot.Initialize(process.env.DISCORD_TOKEN, {
    commandsPath: "./src/Commands",
});
