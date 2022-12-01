import { ModalSubmitInteraction } from "discord.js";
import TSClient from "../TSClient";

interface Run
{
    (client: TSClient, interaction : ModalSubmitInteraction) : Promise<void>
}

export default interface Modal
{
    uniqueId: string,
    run: Run
};