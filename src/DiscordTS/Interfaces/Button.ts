import { ButtonInteraction } from "discord.js";
import TSClient from "../TSClient";

interface Run
{
    (client : TSClient, interaction : ButtonInteraction) : Promise<void>;
}

type IdResolvable = string | Array<string>;

export default interface Button
{
    uniqueId : IdResolvable;
    run : Run;
}