import Event from "../Interfaces/Event";

export default {

    name: "interactionCreate",
    run: async (client, interaction) => {

        if(!interaction.isCommand()) return;

        const command = client.Commands.get(interaction.commandName);

        if(!command) return;

        try
        {
            await command.run(client, interaction);
        }
        catch(error)
        {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }

    }

} as Event;