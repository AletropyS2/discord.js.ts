import TSClient from "./DiscordTS/TSClient";
import { config } from "dotenv";
import ClientLog from "./DiscordTS/ClientLog";

config() // Load .env file

const bot = new TSClient({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages"
    ]
});

bot.Initialize(process.env.DISCORD_TOKEN, {
    commandsPath: "./src/Commands",
});