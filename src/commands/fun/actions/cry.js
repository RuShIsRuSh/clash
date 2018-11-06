const Discord = require("discord.js");
const { Command } = require("discord-akairo");
const snekfetch = require("snekfetch");

class CryCommand extends Command {
    constructor() {
        super("cry", {
            aliases: ["cry"],
			category:'ACTIONS',
			description:{
			content:"Cry...",
			usage:['r!cry']
		}
        });
    }

    async exec(message) {
        // Get cry image
        const { body } = await snekfetch
            .get("https://rra.ram.moe/i/r?type=cry")
            //.set("User-Agent", "Akane (https://github.com/suushii/akane)");
        // Define embed
        const embed = new Discord.RichEmbed()
            .setColor("#18f7c7")
            .setDescription(
                `Give <@${message.author.id}> some emotional support!`
            )
            .setFooter("Powered by weeb.sh v0 | Thanks Wolke!")
            .setImage(`https://rra.ram.moe${body.path}`)
            .setTimestamp();
        // Send message
        return message.channel.send({ embed });
    }
}

module.exports = CryCommand;
