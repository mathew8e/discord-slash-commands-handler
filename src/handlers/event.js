const { readdirSync } = require("fs");

module.exports = (client) => {
	readdirSync("./src/events/").forEach(file => {
		if (!file.endsWith(".js")) return;
		const evt = require(`../events/${file}`);
		const eventName = file.split(".")[0];
		client.on(eventName, evt.bind(null, client));
		console.log(`Loaded event: ${eventName}`);
	});
};