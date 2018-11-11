/*const Discord = require("discord.js");
const sql = require('mysql2');
const { Command } = require('discord-akairo');
const db = sql.createConnection({
        user: 'loveless',
        password: 'nat4para1',
        host: 'tommy.heliohost.org',
        database: 'loveless_discord',
});
class profilecmd extends Command {
    constructor() {
        super('profile', {
            aliases: ['profile','pf'],
            channelRestriction: 'guild',
          	category:'FUN',
			      description:{
					content: 'Shows your stats/profile or the mentioned user\'s stats.',
					usage: ['r!profile','r!pf <mention user>']
        }
        });
    }

    exec(message) {
    var authorUser = message.guild.members.get(message.author.id);
	var recipient = message.content.split(/\s+/g).slice(1).join(" ");
    if (!recipient)
        authorUser = message.guild.members.get(message.mentions.users.firstKey());

    /*if (client.users.get(authorUser.id).bot)
        return message.channel.send(new Discord.RichEmbed()
            .setTitle(':notebook_with_decorative_cover: | Statistics')
            .setColor(0x1BB7CA)
            .setDescription(`You cannot view statistics of a bot.`)
            .setFooter(client.user.username).setTimestamp());
	*/
    /*var partner;
    db.execute(`SELECT first_id, second_id FROM couples
                INNER JOIN members AS m1 ON couples.first_id  = m1.author_id
                INNER JOIN members AS m2 ON couples.second_id = m2.author_id
                WHERE (first_id=${authorUser.id} && m1.guild_id = ${authorUser.guild.id}) ||
                (second_id=${authorUser.id} && m2.guild_id = ${authorUser.guild.id})`,
    (err, rows) =>
    {
        if (err)
            throw err;

        if (rows.length < 1)
            partner = 'None';
        else
        {
            if (rows[0].first_id === message.author.id)
                partner = rows[0].second_id;
            else
                partner = rows[0].first_id;
        }
    });*/

  /*  db.execute(`SELECT * FROM members WHERE author_id=${authorUser.id} AND guild_id=${authorUser.guild.id}`, (err, rows) =>
    {
        if (err)
            throw err;

        if (rows.length < 1)
            return message.reply('No user found with id: ' + authorUser.id);

        var user = client.users.get(authorUser.id);
        return message.channel.send(new Discord.RichEmbed()
            .setAuthor(user.username)
            .setThumbnail(user.avatarURL)
            .setTitle(':notebook_with_decorative_cover: | Statistics')
            .setColor(0x00AE86)
            .addField(':star2: Level', `*${rows[0].level}*`, true)
            .addField(':dizzy: Experience points', `*${rows[0].xp_gained}*`, true)
            .addField(':warning: Warnings', `*${rows[0].warnings}*`, true)
            .addField(':credit_card: Toris', `*${rows[0].toris}*`, true)
            .addField(':pill: Exp boost in effect', `*${parseInt(rows[0].xp_potion_in_effect) === 0 ? false : true}*`, true)
            //.addField(':couple: Partner', `${partner === 'None' ? 'None' : '<@!'+partner+'>'}`, true)
            .setFooter(client.user.username)
            .setTimestamp());
    });

    db.end();
}
}
module.exports = profilecmd;*/
