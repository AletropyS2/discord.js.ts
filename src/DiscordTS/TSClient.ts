import { Client, ClientOptions, Collection, SlashCommandBuilder } from "discord.js"
import Command from "./Interfaces/Command"
import Event from "./Interfaces/Event"
import FileIO from "./FileIO"

export interface PathsOption
{
    commandsPath?: string,
    eventsPath?: string
}

export default class TSClient extends Client
{

    public Commands : Collection<string, Command> = new Collection();
    public CommandsArray : any[] = [];

    constructor(options : ClientOptions)
    {
        super(options);
    }

    public async Initialize(token? : string, paths? : PathsOption)
    {
        await this.login(token ? token : process.env.DISCORD_TOKEN);

        await this.LoadEvents("./src/DiscordTS/Events"); // Load Default Events
        
        if(paths)
        {
            await this.LoadCommands(paths.commandsPath);
            await this.LoadEvents(paths.eventsPath);
        }

    }

    private async LoadCommands(commandsPath? : string)
    {
        if(!commandsPath) return;

        const files = await FileIO.GetAllFiles(commandsPath);
        

        for(const file of files)
        {
            const command = require(file).default as Command;

            this.Commands.set(command.data.name, command);
            this.CommandsArray.push(command.data);
        }
    }

    private async LoadEvents(eventsPath? : string)
    {
        if(!eventsPath) return;

        const files = await FileIO.GetAllFiles(eventsPath);

        for(const file of files)
        {
            const event = require(file).default as Event;

            if(event.once)
            {
                this.once(event.name, (...args) => event.run(this, ...args));
            }
            else
            {
                this.on(event.name, (...args) => event.run(this, ...args));
            }
        }
    }

}