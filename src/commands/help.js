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
	}
}

module.exports = HelpCommand;
