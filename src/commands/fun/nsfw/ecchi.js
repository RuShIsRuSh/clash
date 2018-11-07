const { Command } = require('discord-akairo');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const errors = require('../../../../assets/json/errors');
const subreddits = [
    "hentai",
    "rule34",
    "HQHentai"
]

class ecchiCommand extends Command {
	constructor() {
		super('ecchi', {
            aliases: ['ecchi'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['ecchi']
            }],
			category:'NSFW',
			description:{
			content:"Yeah yeah",
			usage:['r!ecchi']
		}
		});
	}

    async exec(message, args) {
		var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('ðŸ’¢');
            return message.channel.send(errMessage);
        }
		randomPuppy('ecchi')
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setFooter(`ecchi`)
                    .setDescription(`[Image URL](${url})`)   
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
    }
}

module.exports = ecchiCommand;