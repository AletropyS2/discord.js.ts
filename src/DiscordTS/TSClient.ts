import { Client, ClientOptions, Collection, SlashCommandBuilder } from "discord.js"
import Command from "./Interfaces/Command"
import Event from "./Interfaces/Event"
import FileIO from "./FileIO"
import ClientLog from "./ClientLog"

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

        await this.LoadDefaultEvents();
        
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

    private async LoadDefaultEvents()
    {
        this.on("interactionCreate", (interaction) => {
            if(interaction.isCommand())
            {
                const command = this.Commands.get(interaction.commandName);

                if(!command) return;

                command.run(this, interaction);
            }
        });

        this.once("ready", () => {
            console.clear();
            ClientLog.Info(`Logged in as \x1b[33m${this.user.tag}\x1b[0m!`);

            this.application.commands.set(this.CommandsArray);
        })
    }

}