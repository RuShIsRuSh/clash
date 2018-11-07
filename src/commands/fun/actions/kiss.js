const { Command } = require('discord-akairo');
const request = require('snekfetch');
const Discord = require('discord.js');
//const config = require('../../../config.json');
class KissCommand extends Command {
    constructor() {
        super('kiss', {
            aliases: ['kiss'],
            channelRestriction: 'guild',
            args: [{
                id: 'input',
                type: 'string',
                match: 'rest'
            }],
          	category:'ACTIONS',
			      description:{
			        content:"Give that little lady (or golly gent) a peck for all of their hard work! <3",
			        usage:['r!kiss <tag>','r!kiss @Example#1324']
        }
        });
    }

    exec(message, args) {
        request.get('https://weebs.cf/random/kiss').then(body => {
        const recipient = message.content.split(/\s+/g).slice(1).join(" ");
        var kiss = body.text;

        if (!recipient) {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`You can't kiss yourself, but I'll kiss you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == message.author) {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`You can't kiss yourself, but I'll kiss you, ${message.author}!`, { embed: embed });

        } else if (message.mentions.users.first() == this.client.user) {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss);
            return message.channel.send(`I-It's not like I wanted you to kiss me or anything...�:*(?�?�??)*:�`, { embed: embed });

        } else {
            const embed = new Discord.RichEmbed()
                .setColor('#FBCFCF')
                .setImage(kiss)
                .setDescription(`${message.author} kisses ${recipient}!`);
          return message.channel.send({ embed });
        }
	});
}
}

module.exports = KissCommand;