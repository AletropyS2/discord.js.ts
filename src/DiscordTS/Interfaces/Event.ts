import TSClient from "../TSClient";
import { ClientEvents, Events } from "discord.js";

interface Run
{
    (client: TSClient, ...any : any[]): Promise<void>;
}

export default interface Event
{
    name: keyof ClientEvents,
    once?: boolean,
    run: Run;
}