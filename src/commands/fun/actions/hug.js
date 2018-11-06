const { Command } = require("discord-akairo");
const Discord = require('discord.js');
const { hugP } = require('../../../../assets/json/actions.json');

class HugCommand extends Command {
    constructor() {
        super("hug", {
            aliases: ["hug"],
            args: [
                {
                    id: "member",
                    type: "member",
                    default: message => message.member
                }
            ],
			category:'ACTIONS',
			description:{
			content:"Hug someone you're really into",
			usage:['r!hug @Example#1234','r!hug']
			}	
        });
    }

    async exec(message, { member }) {
        var recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var hug = hugP[Math.round(Math.random() * (hugP.length - 1))]

        if (!recipient) {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`You can't hug yourself, but I'll hug you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`You can't hug yourself, but I'll hug you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`ల(\*´= ◡ =｀\*) Such a warm hug..thank you~~ Nyaa~~`, { embed: embed });

        } else {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(hug);
            return message.channel.send(`${message.author} hugs ${recipient}!`, { embed: embed });
        }
    }
}
module.exports = HugCommand;