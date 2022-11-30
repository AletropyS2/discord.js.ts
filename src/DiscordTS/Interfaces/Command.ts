import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import TSClient from "../TSClient";

interface Run
{
    (client: TSClient, interaction : CommandInteraction): Promise<void>;
}

export default interface Command
{
    data : SlashCommandBuilder;
    run : Run;
}