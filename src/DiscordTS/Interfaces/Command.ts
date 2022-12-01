import { ChatInputCommandInteraction, PermissionResolvable, SlashCommandBuilder } from "discord.js";
import TSClient from "../TSClient";

interface Run
{
    (client: TSClient, interaction : ChatInputCommandInteraction): Promise<void>;
}

export default interface Command
{
    data : SlashCommandBuilder;
    permissions?: PermissionResolvable,
    permissionMessage?: string,
    run : Run;
}