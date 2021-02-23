const { MessageEmbed, Client, APIMessage } = require("discord.js");
module.exports.run = async (client, interaction, args) => {
    const user = `<@${args[0].value}>`
    const embed = new MessageEmbed()
		.setColor("#FF0000")
        .setDescription(`Haha, get pinged, ${user}`)
        .setTimestamp();
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: await createAPIMessage(interaction, embed)
        }
    });
    async function createAPIMessage(interaction, content) {
        const apiMessage = await APIMessage.create(client.channels.resolve(interaction.channel_id), content)
            .resolveData()
            .resolveFiles();
        return { ...apiMessage.data, files: apiMessage.files };
    }
}
module.exports.help = {
    name: "ping",
    description: "Ping your worst enemy",
    options: [
        {
            name: "User",
            description: "Select your worst enemy...",
            type: 6,
            required: true
        }
    ]
};