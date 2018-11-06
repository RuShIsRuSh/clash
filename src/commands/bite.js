const {Command} = require('discord-akairo');

const fetchImage = requireUtil('fetch-image');
const relevantLink = requireUtil('relevant-link');
const render = requireUtil('render');

const options = {
	aliases: ['bite', 'bit', 'nom'],
	args: [{
		id: 'user',
		type: 'relevant',
		match: 'content'
	}],
	category: 'FUN',
	description:{
		usage: 'r!bite <user>',
		content: 'Bite someone... In a cute way don\'t worry it won\'t hurt',
		examples:['`r!bite @Example#1234`','r!bite with a file attached']
	}
};

async function exec(message, args) {
	const link = relevantLink(message, args.user);

	if (!link) {
		await message.channel.send('No source found ;-;');
		return;
	}

	await message.channel.startTyping();

	const image = await render({
		image: './assets/bite.jpg'
	}, {
		image: fetchImage(link.url),
		height: 200,
		width: 200,
		x: 120,
		y: 370,
		background: '#36393e'
	}, {
		image: './assets/bite-overlay.png'
	});

	await message.channel.send(`**${link.name}** was bitten successfully >\\_<`, {
		files: [{
			name: 'image.jpeg',
			attachment: await image
				.jpeg({
					quality: 50
				})
				.toBuffer()
		}]
	});

	await message.channel.stopTyping();
}

module.exports = new Command('bite', exec, options);
