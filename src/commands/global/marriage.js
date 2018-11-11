const Discord = require("discord.js");
const sql = require('mysql2');
const { Command } = require('discord-akairo');
// create the connection to database
const db = sql.createConnection({
        user: 'loveless',
        password: 'nat4para1',
        host: 'tommy.heliohost.org',
        database: 'loveless_discord',
});
	db.connect(err =>{
		if(err) throw err;
		console.log('Connected | MYSQL');
	});
const usersOnCooldown = new Set();
class marrycmd extends Command {
    constructor() {
        super('marriage', {
            aliases: ['marry','m'],
            channelRestriction: 'guild',
          	category:'FUN',
			      description:{
					content: 'Tag your love and marry him/her! If he/she accepts that is.',
					usage: 'r!marry <tag>'
        }
        });
    }

    exec(message) {
    /*const db = new DbConnectionPool({
        user: 'loveless',
        password: 'nat4para1',
        host: 'tommy.heliohost.org',
        database: 'loveless_discord',
    });*/
    var recipient = message.content.split(/\s+/g).slice(1).join(" ");
    if (!recipient)
    {
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':ring: | Marriage')
            .setColor(0xD11313)
            .setDescription(`Incorrect command. You have to tag someone first.`)
            .setFooter(client.user.username).setTimestamp());
    }

    var mentionedUser = message.mentions.users.firstKey();
    if (!mentionedUser)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':ring: | Marriage')
            .setColor(0xD11313)
            .setDescription(`Incorrect command. Try again.`)
            .setFooter(client.user.username).setTimestamp());

    if (mentionedUser === message.author.id)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':ring: | Marriage')
            .setColor(0xD11313)
            .setDescription(`You cannot marry yourself! Even if you're **that** lonely...`)
            .setFooter(client.user.username).setTimestamp());
    if (client.users.get(mentionedUser).bot)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':ring: | Marriage')
            .setColor(0xD11313)
            .setDescription(`You cannot marry a bot!`)
            .setFooter(client.user.username).setTimestamp());

    /*if (message.guild.members.get(mentionedUser).presence.status === 'offline' ||
        message.guild.members.get(mentionedUser).presence.status === 'idle')
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':ring: | Marriage')
            .setColor(0xD11313)
            .setDescription(`You cannot marry your love when he/she is AFK/Offline.`)
            .setFooter(client.user.username).setTimestamp());*/
    db.execute(`SELECT * FROM couples WHERE first_id=${message.author.id} || second_id=${message.author.id} || first_id=${mentionedUser} || second_id=${mentionedUser}`, (err, rows) =>
    {
        if (rows.length < 1)
        {
            if (!usersOnCooldown.has(message.author.id) && !usersOnCooldown.has(mentionedUser))
            {
                usersOnCooldown.add(message.author.id);
                usersOnCooldown.add(mentionedUser);
                setTimeout(() =>
                {
                    usersOnCooldown.delete(message.author.id);
                    usersOnCooldown.delete(mentionedUser);
                }, 30 * 1000);

                message.channel.send(new Discord.RichEmbed().setTitle(':ring: | Marriage')
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
                    if (msg === 'yes')
                    {
                        db.execute(`SELECT * FROM couples WHERE first_id=${message.author.id} || second_id=${message.author.id} || first_id=${mentionedUser} || second_id=${mentionedUser}`, (err, rows) =>
                        {
                            if (rows.length < 1)
                            {
                                db.execute(`INSERT INTO couples (first_id, second_id) VALUES(${message.author.id}, ${mentionedUser})`);
                                message.channel.send(new Discord.RichEmbed()
                                    .setTitle(':church:  | Marriage :man_in_tuxedo: :bride_with_veil:')
                                    .setColor(0x00AE86)
                                    .setDescription(`Congratulations <@!${message.author.id}>, <@!${mentionedUser}> ! You are now married!`)
                                    .setTimestamp());
                            }
                        });
                        db.end();
                    }
                    else if (msg === 'no')
                    {
                        message.channel.send(new Discord.RichEmbed()
                            .setTitle(':ring: | Marriage')
                            .setColor(0x00AE86)
                            .setDescription(`Awww, feels bad man. <@!${message.author.id}>`)
                            .setTimestamp());
                    }
                }).catch(answer => message.channel.send(new Discord.RichEmbed()
                    .setTitle(':ring: | Marriage')
                    .setColor(0xD11313)
                    .setDescription(`Time over.`)
                    .setTimestamp()));

            }
            else
            {
                return message.channel.send(new Discord.RichEmbed()
                    .setTitle(':ring: | Marriage')
                    .setColor(0xD11313)
                    .setDescription(`Your request has already been made. Try again later.`));
            }
        }
        else
        {
            return message.channel.send(new Discord.RichEmbed()
                .setTitle(':ring: | Marriage')
                .setColor(0xD11313)
                .setDescription(`Either one of you is already married! How shameless!`)
                .setTimestamp());
        }
    })
}
}
module.exports = marrycmd;