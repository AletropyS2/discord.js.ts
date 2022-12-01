import { ChatInputCommandInteraction, Client, ClientOptions, Collection, CommandInteraction, EmbedBuilder, GuildMember, GuildMemberEditData, PermissionResolvable, PermissionsBitField, SlashCommandBuilder } from "discord.js"
import Command from "./Interfaces/Command"
import Event from "./Interfaces/Event"
import FileIO from "./FileIO"
import ClientLog from "./ClientLog"
import Button from "./Interfaces/Button"

export interface PathsOption
{
    commandsPath?: string,
    eventsPath?: string,
    buttonsPath? : string;
}

export default class TSClient extends Client
{

    public Commands : Collection<string, Command> = new Collection();
    public CommandsArray : any[] = [];

    public Buttons : Collection<string, Button> = new Collection();

    constructor(options : ClientOptions)
    {
        super(options);
    }

    public async Initialize(token? : string, paths? : PathsOption)
    {
        await this.LoadDefaultEvents();
        
        if(paths)
        {
            await this.LoadCommands(paths.commandsPath);
            await this.LoadEvents(paths.eventsPath);
            await this.LoadButtons(paths.buttonsPath);
        }
        
        await this.login(token ? token : process.env.DISCORD_TOKEN);
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

    private async LoadButtons(buttonsPath? : string)
    {
        if(!buttonsPath) return;

        const files = await FileIO.GetAllFiles(buttonsPath);
        

        for(const file of files)
        {
            const button = require(file).default as Button;

            this.Buttons.set(button.uniqueId, button);
        }
    }

    private async LoadDefaultEvents()
    {
        this.once("ready", () => {
            console.clear();
            ClientLog.Info(`Logged in as \x1b[33m${this.user.tag}\x1b[0m!`);
    
            this.application.commands.set(this.CommandsArray);
        })

        this.on("interactionCreate", (interaction) => {

            if(interaction.isCommand())
            {
                const command = this.Commands.get(interaction.commandName);

                if(!command) return;

                if(command.permissions)
                    if(!CheckPermissions(command.permissions, interaction, command.permissionMessage)) return;

                command.run(this, interaction as ChatInputCommandInteraction);
            }

            if(interaction.isButton())
            {
                const button = this.Buttons.get(interaction.customId);

                if(!button) return;

                button.run(this, interaction);
            }
        });
    }

}

function CheckPermissions(permissions : PermissionResolvable, int : CommandInteraction, msg? : string) : boolean
{
    const has = (int.member.permissions as PermissionsBitField).has(permissions);

    if(has) return true;

    const embed = new EmbedBuilder()
    .setTitle("Error ❌")
    .setDescription(msg ? msg : "You don't have permission to use this command!")
    .setColor("Red")
    .setTimestamp(Date.now());

    int.reply({ embeds: [ embed ], ephemeral: true });
    
    return false;
}