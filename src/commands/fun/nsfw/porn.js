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
            aliases: ['p','nude'],
            channelRestriction: 'guild',
            args: [{
                id: 'options',
                type: ['gb','futa','hentai','ass','boobs','lingerie','ecchi']
            }],
			category:'NSFW',
			description:{
			content:"Oh my, this is a really big search: Gelbooru, etc",
			usage:['r!p gb <tag>','r!p futa','r!p hentai','r!p ass','r!p boobs','r!p lingerie','r!p ecchi'],
			examples:['r!p gb loli','r!p futa']
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
        if (args.options === 'gb') {
		//if (message.content.toUpperCase().includes('LOLI') || message.content.toUpperCase().includes('GORE')) return message.channel.send('That kind of stuff is not allowed! Not even in NSFW channels!');
        booru.search('gelbooru', [query], { limit: 75, random: true })
            .then(booru.commonfy)
            .then(images => {
                for (let image of images) {
                    const embed = new Discord.RichEmbed()
                        .setAuthor(`Gelbooru ${query}`, 'https://b.catgirlsare.sexy/NrAI.png')
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
		if (args.options === 'futa') {
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
		if (args.options === 'hentai') {
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
		if (args.options === 'ass') {
		    const id = [Math.floor(Math.random() * 4923)];
            const res = await snekfetch.get(`http://api.obutts.ru/butts/${id}`);
            const preview = res.body[0]["PREVIEW".toLowerCase()];
            const image = `http://media.obutts.ru/${preview}`;

            const embed = new Discord.RichEmbed()
                .setFooter('http://obutts.ru/')
                .setImage(image)
                .setColor('#CEA0A6');
            return message.channel.send({ embed });
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
		if (args.options === 'ecchi') {
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
}

module.exports = PornCommand;