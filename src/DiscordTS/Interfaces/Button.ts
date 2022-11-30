import { ButtonInteraction } from "discord.js";
import TSClient from "../TSClient";

interface Run
{
    (client : TSClient, interaction : ButtonInteraction) : Promise<void>;
}

export default interface Button
{
    uniqueId : string;
    run : Run;
}