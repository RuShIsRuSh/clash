const { Command } = require('discord-akairo');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const booru = require('booru');
const randomPuppy = require('random-puppy');
const errors = require('../../../../assets/json/errors');
const subreddits = [
    "hentai",
    "rule34",
    "HQHentai"
]

class futaCommand extends Command {
	constructor() {
		super('futa', {
            aliases: ['futa'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['futa']
            }],
			category:'NSFW',
			description:{
			content:"Yeah yeah",
			usage:['r!futa']
		}
		});
	}

    async exec(message, args) {
		var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('ðŸ’¢');
            return message.channel.send(errMessage);
        }
        randomPuppy('futanari')
        .then(url => {
            let embed = new Discord.RichEmbed()
                .setFooter(`futanari`)
                .setDescription(`[Image URL](${url})`)   
                .setImage(url)
                .setColor('#A187E0');
            return message.channel.send({ embed });
        })

        return null;
    }
}

module.exports = futaCommand;