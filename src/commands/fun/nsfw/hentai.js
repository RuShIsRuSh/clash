const { Command } = require('discord-akairo');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const errors = require('../../../../assets/json/errors');
const randomPuppy = require('random-puppy');
const subreddits = [
    "hentai",
    "rule34",
    "HQHentai"
]

class HentaiCommand extends Command {
	constructor() {
		super('hentai', {
            aliases: ['hentai'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['hentai']
            }],
			category:'NSFW',
			description:{
			content:"Yeah yeah",
			usage:['r!hentai']
		}
		});
	}

    async exec(message, args) {
		var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('ðŸ’¢');
            return message.channel.send(errMessage);
        }
		var query = message.content.split(/\s+/g).slice(2).join(" ");
		var randSubreddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

        randomPuppy(randSubreddit)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setFooter(`${randSubreddit}`)
                    .setDescription(`[Image URL](${url})`)   
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
		}
}

module.exports = HentaiCommand;