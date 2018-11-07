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

class PornCommand extends Command {
	constructor() {
		super('porn', {
            aliases: ['porn','nude','p'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['ass','lingerie']
            }],
			category:'NSFW',
			description:{
			content:"Yeah yeah",
			usage:['r!porn ass','r!p lingerie'],
			examples:['r!porn ass','r!p lingerie','r!p ass']
		}
		});
	}

    async exec(message, args) {
		var errMessage = errors[Math.round(Math.random() * (errors.length - 1))];
        if (!message.channel.nsfw) {
            message.react('ðŸ’¢');
            return message.channel.send(errMessage);
        }
		if (args.options === 'ass') {
            snekfetch.get('https://nekobot.xyz/api/image?type=ass').then(r => { 
                let body = r.body;
                let thighurl = body.message;
                const embed = this.client.util.embed()
                 .setTitle("Ass~")
                 .setImage(thighurl)
                 .setColor("#363942");
                message.channel.send(embed);

                console.log("Thigh CMD Used in: " + message.guild.name);
            });
		}
		if (args.options === 'lingerie') {
		var subreddits1 = [
            'lingerie',
            'stockings',
            'pantyfetish',
            'panties'
        ]

        var sub = subreddits1[Math.round(Math.random() * (subreddits1.length - 1))];

        randomPuppy(sub)
            .then(url => {
                const embed = new Discord.RichEmbed()
                    .setFooter(`Lingerie`)
                    .setDescription(`[Image URL](${url})`)   
                    .setImage(url)
                    .setColor('#A187E0');
                return message.channel.send({ embed });
            })
		}
    }
}

module.exports = PornCommand;