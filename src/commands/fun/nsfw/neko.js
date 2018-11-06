const { Command } = require('discord-akairo');
const request = require('snekfetch');
const Discord = require('discord.js');
//const config = require('../../../config.json');

class NekoCommand extends Command {
	constructor() {
		super('neko', {
            aliases: ['neko'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['nsfw']
            }],
			category:'FUN',
			description:{
			content:"Posts a random neko, can be used in nsfw channels and you'll see what happens",
			usage:['r!neko']
		}
		});
	}

    exec(message, args) {
        if (!message.channel.nsfw) {
            request.get('https://nekos.life/api/v2/img/neko').then(body => {
                let embed = new Discord.RichEmbed()
                    .setImage(JSON.parse(body.text).url)
                    .setFooter(`Requested by ${message.author.username} | 💛 API : ${Date.now() - message.createdTimestamp} ms`)
                    //.setColor(config.color.second);
                message.channel.send({
                    embed: embed
                });
            });
        }else{
            request.get('https://nekos.life/api/v2/img/nsfw_neko_gif').then(body => {
                let embed = new Discord.RichEmbed()
                    .setImage(JSON.parse(body.text).url)
                    .setFooter(`Requested by ${message.author.username} | 💛 API : ${Date.now() - message.createdTimestamp} ms`)
                    //.setColor(config.color.second);
                message.channel.send({
                    embed: embed
                });
            });
        }
    }
}

module.exports = NekoCommand;