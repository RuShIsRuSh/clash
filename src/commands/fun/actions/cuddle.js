const { Command } = require('discord-akairo');
const fetch = require('snekfetch');

const storecuddle = "https://nekos.life/api/v2/img/cuddle";

class cuddlecmd extends Command {
    constructor() {
        super('cuddle', {
            aliases: ['cuddle'],
            channelRestriction: 'guild',
            category:'ACTIONS',
			      description:{
			        content:"Cuddle with your loved ones like they are right there <3",
			        usage:['r!cuddle']
        }
        });
    }


    exec(message) {
            fetch.get(storecuddle).then(r => { 
                let body = r.body;
                let cuddleurl = body.url;

                const taggedUser = message.mentions.users.first();
                const CommandAuthor = message.author.username;

                if (!message.mentions.users.size) {
                    return message.channel.send('You need to `@mention` a member to cuddle them.');
                }

                if (message.author == taggedUser) {
                    return message.channel.send(message.author + " cuddles themselves, how sad...");
                }

                const embed = this.client.util.embed()
                 .setTitle(`${CommandAuthor} cuddles up against ${taggedUser.username}.`)
                 .setImage(cuddleurl)
                 .setColor("#363942");
                message.channel.send(embed);
                

                console.log("Cuddle CMD Used in: " + message.guild.name);
            });
            
        };
    }

module.exports = cuddlecmd;