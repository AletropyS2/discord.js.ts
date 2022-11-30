import { EmbedBuilder } from "@discordjs/builders";
import { Colors, SlashCommandBuilder } from "discord.js";
import Command from "../DiscordTS/Interfaces/Command";

export default {

    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds bot latency"),
    run: async (client, interaction) => {

        const embed = new EmbedBuilder()
        .setTitle("🔔 Ping Requested!")
        .setColor(Colors.Gold)
        .setDescription(`🏓 Pong! \`${client.ws.ping}ms\``)
        .setTimestamp(Date.now());

        await interaction.reply({ embeds: [embed], ephemeral: true });

    }

} as Command;