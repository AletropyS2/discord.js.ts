const rc = "\x1b[31m"; // Red
const gc = "\x1b[32m"; // Green
const yc = "\x1b[33m"; // Yellow
const oc = "\x1b[34m"; // Orange 
const rsc = "\x1b[0m"; // Reset color

export default class ClientLog
{
    public static Log(value : any) : void
    {
        console.log(`${gc}( DISCORD.TS | LOG) ->${rsc} ${value}`);
    }

    public static Warn(value : any) : void
    {
        console.log(`${yc}( DISCORD.TS | WARN) ->${rsc} ${value}`);
    }

    public static Error(value : any) : void
    {
        console.log(`${rc}( DISCORD.TS | ERROR) ->${rsc} ${value}`);
    }

    public static Info(value : any) : void
    {
        console.log(`${oc}( DISCORD.TS | INFO) ->${rsc} ${value}`);
    }
}