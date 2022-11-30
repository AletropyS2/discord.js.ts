import ClientLog from "../ClientLog";
import Event from "../Interfaces/Event";

export default {

    name: "ready",
    run: async (client) => {
        console.clear();
        ClientLog.Info(`Logged in as \x1b[33m${client.user.tag}\x1b[0m!`);

        client.application.commands.set(client.CommandsArray);
    }

} as Event