const { Command } = require('discord-akairo');
const  Discord  = require('discord.js');
const { stripIndents } = require('common-tags');
const config = requireUtil('config');
class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help'],
			description: {
				content: 'Displays a list of available commands, or detailed information for a specified command.',
				usage: '[command]'
			},
			category: 'util',
			clientPermissions: ['EMBED_LINKS'],
			ratelimit: 2,
			args: [
				{
					id: 'command',
					type: 'commandAlias'
				}
			]
		});
	}

	exec(message, { command }) {
		const prefix = this.handler.prefix(message);
		if (!command) {
			const embed = new Discord.RichEmbed()
				.setColor(3447003)
				.addField('Commands', stripIndents`A list of available commands.
					For additional info on a command, type<:002mesenpai:501457040410148864>\`${prefix[0]}help <command>\`
				`);

			for (const category of this.handler.categories.values()) {
				embed.addField(`${category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase())}`, `${category.filter(cmd => cmd.aliases.length).map(cmd => `\`${cmd.aliases[0]}\``).join(' ')}`);
			}
			return message.util.send(embed);
		}

		const embed = new Discord.RichEmbed()
			.setColor(3447003)
			.setTitle(`*${command.aliases[0].toUpperCase()}*`)
			.addField('Description', command.description.content || '\u200b');

		if (command.aliases.length > 1) embed.addField('Aliases', `\`${command.aliases.join('` `')}\``, true);
		if (command.description.examples && command.description.examples.length) embed.addField('Examples', `\`${command.description.examples.join(`\`\n\` `)}\``, true);

		return message.util.send(embed);
	}const Command = require('../../struct/custom/Command');

class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help', 'commands'],
      description: {
        content: 'Displays available commands.',
        usage: '<command name>',
        examples: ['', 'ping', 'info']
      },
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          id: 'command',
          type: 'commandAlias'
        },
        {
          id: 'pub',
          type: 'string',
          match: 'flag',
          prefix: ['--pub', '--public']
        }
      ]
    });
  }

  exec(message, { command, pub }) {
    const prefix = this.handler.prefix(message);
    if (!command) return this.defaultHelp(message, prefix, pub);

    const clientPermissions = command.clientPermissions;
    const userPermissions = command.userPermissions;
    const embed = this.client.util.embed()
      .setColor(0xFF00AE)
      .setTitle(`${prefix}${command} ${command.description.usage ? command.description.usage : ''}`)
      .setDescription(`${
        clientPermissions
          ? `**Required Bot Permissions: ${clientPermissions.map(p => `\`${p}\``).join(', ')}**\n`
          : userPermissions
            ? `**Required User Permissions: ${userPermissions.map(p => `\`${p}\``).join(', ')}**\n`
            : ''
      }${command.description.content}`);

    if (command.aliases.length > 1)
      embed.addField('Aliases',
        command.aliases.slice(1).map(a => `\`${a}\``).join(', ')
      );
    if (command.description.examples)
      embed.addField('Examples',
        command.description.examples.map(e => `${prefix}${command} ${e}`).join('\n')
      );

    return message.util.send({ embed });
  }

  defaultHelp(message, prefix, pub) {
    const embed = this.client.util.embed()
      .setColor(0xFF00AE)
      .setTitle('Commands')
      .setDescription(`${message.guild ? `This guild's prefix is \`${prefix}\`\n` : ''}For more info about a command, see: \`help [command]\``);

    for (const category of this.handler.categories.values()) {
      const title = {
        admin: 'Server Manager',
        general: 'General',
		nsfw: 'NSFW',
		actions: 'Actions',
        util: 'Utilities'
      }[category.id];

      if (
        (!message.guild && category.id === 'admin') ||
        (message.guild && category.id === 'admin' && !message.channel.permissionsFor(message.member).has('MANAGE_GUILD'))
	(!message.guild && category.id == 'nsfw') || 
	(message.guild && category.id === 'nsfw' && !message.member.roles.has('448425503603556362'))
      ) continue;
      const publicCommands = message.author.id === this.client.ownerID && !pub ? category : category.filter(c => !c.ownerOnly);
      if (title) embed.addField(title, publicCommands.map(c => `\`${c.aliases[0]}\``).join(', '));
    }

    return message.util.send({ embed });
  }
}

module.exports = HelpCommand;
}

module.exports = HelpCommand;
