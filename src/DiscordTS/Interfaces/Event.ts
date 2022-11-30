import TSClient from "../TSClient";
import { Events } from "discord.js";

interface Run
{
    (client: TSClient, ...any : any[]): Promise<void>;
}

export default interface Event
{
    name: string,
    once?: boolean,
    run: Run;
}