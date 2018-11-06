const { Command } = require("discord-akairo");

class ShipCommand extends Command {
    constructor() {
        super("ship", {
            aliases: ["ship", "combine"],
            channel: "guild",
            args: [
                {
                    id: "name1",
                    type: "string"
                },
                {
                    id: "name2",
                    type: "string"
                }
            ],
			category:'FUN',
			description:{
			content:"Ship someone/yourself with someone",
			usage:['r!ship @Example#1234 @Example#4321','r!ship <someone> <someone>']
		}
        });
    }

    async exec(message, { name1, name2 }) {
        // do some quipmafs to combine strings
        var shippuden = Math.floor(Math.random() * 3) + 2;
        var shipname1 = name1;
        var shipname2 = name2;
        var slice1 = shipname1.slice(0, shippuden);
        var slice2 = shipname2.slice(3);
        var finalshipname = slice1 + slice2;
        //send message
        return message.reply("Introducing... " + finalshipname + "!");
    }
}

module.exports = ShipCommand;
