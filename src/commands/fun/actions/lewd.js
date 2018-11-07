const { Command } = require('discord-akairo');
const request = require('snekfetch');
const Discord = require('discord.js');
//const config = require('../../../config.json');
const { lewdP } = require('../../../../assets/json/actions.json');
class LewdCommand extends Command {
    constructor() {
        super('lewd', {
            aliases: ['lewd','thatslewd'],
            channelRestriction: 'guild',
            args: [{
                id: 'input',
                type: 'string',
                match: 'rest'
            }],
          	category:'ACTIONS',
			      description:{
			        content:"L-L-l-Lewd Baka, doing something inappropriate",
			        usage:['r!lewd']
        }
        });
    }

    exec(message, args) {
        let embed = new Discord.RichEmbed()
            .setColor('#FBCFCF')
            .setImage(lewdP[Math.round(Math.random() * (lewdP.length - 1))]);
        return message.channel.send('L-Lewd!', { embed: embed });
}
}

module.exports = LewdCommand;