import TSClient from "./DiscordTS/TSClient";
import { config } from "dotenv";

config() // Load .env file

const bot = new TSClient({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages"
    ]
});

bot.Initialize();