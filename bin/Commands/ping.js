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
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("ping")
        .setDescription("Responds bot latency"),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new builders_1.EmbedBuilder()
            .setTitle("🔔 Ping Requested!")
            .setColor(discord_js_1.Colors.Gold)
            .setDescription(`🏓 Pong! \`${client.ws.ping}ms\``)
            .setTimestamp(Date.now());
        yield interaction.reply({ embeds: [embed], ephemeral: true });
    })
};
