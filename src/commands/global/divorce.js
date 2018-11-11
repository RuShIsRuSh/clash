const Discord = require("discord.js");
const sql = require('mysql2');
const { Command } = require('discord-akairo');
const db = sql.createConnection({
        user: 'loveless',
        password: 'nat4para1',
        host: 'tommy.heliohost.org',
        database: 'loveless_discord',
});
class divorcecmd extends Command {
    constructor() {
        super('divorce', {
            aliases: ['divorce','d'],
            channelRestriction: 'guild',
          	category:'FUN',
			      description:{
					content: 'Tag your partner to divorce.',
					usage: 'r!divorce <tag>'
        }
        });
    }

    exec(message) {
	var recipient = message.content.split(/\s+/g).slice(1).join(" ");
    if (!recipient)
    {
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':broken_heart: | Divorce')
            .setColor(0xD11313)
            .setDescription(`Incorrect command. You have to tag someone first.`)
            .setFooter(client.user.username).setTimestamp());
    }

    var mentionedUser = message.mentions.users.firstKey();
    if (!mentionedUser)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':broken_heart: | Divorce')
            .setColor(0xD11313)
            .setDescription(`Incorrect command. Try again.`)
            .setFooter(client.user.username).setTimestamp());

    if (mentionedUser === message.author.id)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':broken_heart: | Divorce')
            .setColor(0xD11313)
            .setDescription(`You cannot divorce yourself!`)
            .setFooter(client.user.username).setTimestamp());

    if (client.users.get(mentionedUser).bot)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':broken_heart: | Divorce')
            .setColor(0xD11313)
            .setDescription(`You cannot divorce a bot!`)
            .setFooter(client.user.username).setTimestamp());

    if (message.guild.members.get(mentionedUser).presence.status === 'offline' ||
        message.guild.members.get(mentionedUser).presence.status === 'idle')
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':broken_heart: | Divorce')
            .setColor(0xD11313)
            .setDescription(`You cannot divorce your partner when he/she is AFK/Offline.`)
            .setFooter(client.user.username).setTimestamp());

    db.execute(`SELECT * FROM couples WHERE (first_id=${message.author.id} || second_id=${message.author.id}) && (first_id=${mentionedUser} || second_id=${mentionedUser})`, (err, rows) =>
    {
        if (rows.length < 1)
        {
            return message.channel.send(new Discord.RichEmbed()
                .setTitle(':broken_heart: | Divorce')
                .setColor(0xD11313)
                .setDescription(`You are not even married, how can you get a divorce?!`)
                .setFooter(client.user.username).setTimestamp());
        }
        else
        {
            message.channel.send(new Discord.RichEmbed()
                .setTitle(':pen_ballpoint: | Divorce')
                .setColor(0x00AE86)
                .setDescription(`<@!${mentionedUser}> if you accept type '**yes**', otherwise type '**no**'. \n\nYou have 30 second(s).`));

            const filter = m => (m.content.toLowerCase() === 'yes' || m.content.toLowerCase() === 'no') && m.author.id === mentionedUser;
            message.channel.awaitMessages(filter,
            {
                max: 1,
                time: 30 * 1000,
                errors: ['time']
            }).
            then(answer =>
            {
                let msg = answer.first().content.toLowerCase();
                switch (msg)
                {
                    case 'yes':
                        db.execute(`DELETE FROM couples WHERE first_id=${message.author.id} || second_id=${message.author.id} || first_id=${mentionedUser} || second_id=${mentionedUser}`);
                        message.channel.send(new Discord.RichEmbed()
                            .setTitle(':pen_ballpoint:  | Divorce')
                            .setColor(0x00AE86)
                            .setDescription(`Congratulations <@!${message.author.id}>, <@!${mentionedUser}> ! You are now divorced!`)
                            .setTimestamp());
                        break;

                    case 'no':
                        message.channel.send(new Discord.RichEmbed()
                            .setTitle(':broken_heart: | Divorce')
                            .setColor(0x00AE86)
                            .setDescription(`Awww, feels bad man. <@!${message.author.id}>`)
                            .setTimestamp());
                        break;
                }
                db.end();
            }).catch(answer => message.channel.send(new Discord.RichEmbed()
                .setTitle(':broken_heart: | Divorce')
                .setColor(0xD11313)
                .setDescription(`Time over.`)
                .setTimestamp()));;
        }
    });
}
}
module.exports = divorcecmd;