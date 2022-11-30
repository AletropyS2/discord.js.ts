import { Client, ClientOptions } from "discord.js"

export default class TSClient extends Client
{

    constructor(options : ClientOptions)
    {
        super(options);
    }

    public async Initialize(token? : string)
    {
        await this.login(token ? token : process.env.DISCORD_TOKEN);
    }

}