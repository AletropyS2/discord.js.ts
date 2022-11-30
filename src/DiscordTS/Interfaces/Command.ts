import { CommandInteraction, PermissionFlagsBits, PermissionResolvable, SlashCommandBuilder } from "discord.js";
import { Type } from "typescript";
import TSClient from "../TSClient";

interface Run
{
    (client: TSClient, interaction : CommandInteraction): Promise<void>;
}

export default interface Command
{
    data : SlashCommandBuilder;
    permissions?: PermissionResolvable,
    permissionMessage?: string,
    run : Run;
}