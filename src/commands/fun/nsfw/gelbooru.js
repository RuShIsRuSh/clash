const { Command } = require('discord-akairo');
const snekfetch = require('snekfetch');
const Discord = require('discord.js');
const booru = require('booru');
const errors = require('../../../../assets/json/errors');

class GelbooruCommand extends Command {
	constructor() {
		super('gelbooru', {
            aliases: ['gelbooru','gb'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['gb']
            }],
			category:'NSFW',
			description:{
			content:"Yeah yeah",
			usage:['r!gelbooru loli','r!gelbooru','r!gb loli','r!gb']
		}
		});
	}

    async exec(message, args) {
		var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('ðŸ’¢');
            return message.channel.send(errMessage);
        }
		var query = message.content.split(/\s+/g).slice(1).join(" ");
		//if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');
        booru.search('gelbooru', [query], { limit: 75, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.RichEmbed()
                        .setAuthor(`Gelbooru | ${query}`, 'https://b.catgirlsare.sexy/NrAI.png')
                        .setDescription(`[Image URL](${image.common.file_url})`)
                        .setImage(image.common.file_url)
                        .setColor('#E89F3E');
                    return message.channel.send({ embed });
                }
            }).catch(err => {
                if (err.name === 'booruError') {
                    return message.channel.send(`No results found for **${query}**!`);
                } else {
                    return message.channel.send(`No results found for **${query}**!`);
                }
            })
    }
}

module.exports = GelbooruCommand;