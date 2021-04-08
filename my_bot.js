// Load the secret bot token
const token = require('./token.json')
// Load the fast-csv parse module
const fs = require('fs')
const csv = require('@fast-csv/parse')
// Parse csv file into an array
const csvFileName = "allPLUcodes.csv"
const allPLUcodes = []
csv.parseFile(csvFileName, {headers: true})
    .on("data", data => {
    allPLUcodes.push(data)
    })
    .on("end", () => {
    console.log(`Finished parsing '${csvFileName}' for a total of ${allPLUcodes.length} lines\n`)
    });

// create new arrays by Category
// Dried Fruits array
/*varietyParse = () => {
    allDriedFruitsCodes = []
    console.log(allPLUcodes.length)
    for (i=0;i<=allPLUcodes.length;i++) {
        console.log(allPLUcodes[i])
        if (allPLUcodes[i].VARIETY.toUpperCase() === "Dried Fruits") {
            allDriedFruitsCodes.push(allPLUcodes[i])
        }
    }
    console.log(allDriedFruitsCodes)
}*/

// Load the discord bot modules
const Discord = require('discord.js')
const client = new Discord.Client()
// Execute when bot is turned on
client.on('ready', () => {
    // Display bot username
    console.log("Connected as " + client.user.tag)
    // User, channel, & server totals
    console.log(`Users: ${client.users.cache.size} | Channels: ${client.channels.cache.size} | Servers: ${client.guilds.cache.size}`)
    // List all servers the bot is connected to
    console.log("Servers:")
    client.guilds.cache.forEach((guild) => {
        console.log(` - [${guild.id}] ${guild.name}`)


        client.user.setActivity("made by Emer Conghaile");
        // List each channel
        //guild.channels.cache.forEach((channel) => {
        //    console.log (` -- ${channel.name} (${channel.type}) - [${channel.id}]`)
        //})
    })
})
// Execute when bot sees a message
client.on('message', (message) => {
    if (message.author.bot) return false

    // Check if the bot's user was tagged in the message
    if (message.mentions.has(client.user.id)) {
        message.channel.send("hey " + message.author.toString() + " shut up and leave me alone")
    }

    if (message.content.startsWith("!")) {
        processCommand(message)
    }
})

// When discord message beings with "!"
processCommand = message => {
    let fullCommand = message.content.substring(1)
    let splitCommand = fullCommand.split(" ")
    let primaryCommand = splitCommand[0]
    let arguments = splitCommand.slice(1)

    console.log(`\n${"Server:".padEnd(11)}[${message.guild.id}] ${message.guild.name}`)
    console.log(`${"Channel:".padEnd(11)}[${message.channel.id}] ${message.channel.name}`)
    console.log(`${"User:".padEnd(11)}[${message.author.id}] ${message.author.tag}`)
    console.log(`${"Command:".padEnd(11)}${primaryCommand}`)
    console.log(`${"Arguments:".padEnd(11)}${arguments}`)

    if (primaryCommand == "help") {
        helpCommand(arguments, message)
    } else if (primaryCommand == "about") {
        aboutCommand(arguments, message)
    } else if (primaryCommand == "search") {
        searchCommand(arguments, message)
    } else if (primaryCommand == "quiz") {
        quizCommand(arguments, message)
    } else {
        message.channel.send("Invalid command, type '!help'")
    }
}
// !help
helpCommand = (arguments, message) => {
    message.author.send(
`Valid Commands:

- !help
- !search plu [number]
- !search variety [name]
- !quiz plu`
    )
}
// !about
aboutCommand = (arguments, message) => {
    message.author.send(
`Type !help to see all commands
    
Made by Emer Conghaile
https://github.com/emerconghaile/plu-discord-bot/`
    )
}
// !search
searchCommand = (arguments, message) => {
    if (arguments.length > 0) {
        if (arguments[0].toUpperCase() === "PLU") {
            if (arguments.length >= 2) {
                let obj = allPLUcodes.find(obj => obj.PLU == arguments[1])
                console.log(obj)
                if ( typeof obj !== "undefined") {
                    if (obj.VARIETY) {
                        message.channel.send(`${obj.COMMODITY}, ${obj.VARIETY}, ${obj.SIZE}`)
                    } else {
                        message.channel.send(`${obj.COMMODITY}, -- , ${obj.SIZE}`)
                    }
                } else {
                    message.channel.send("Invalid PLU")
                }
            } else if (arguments.length <= 1) {
                message.channel.send("Missing PLU")
            }
        } else if (arguments[0].toUpperCase() === "VARIETY") {
            if (arguments.length >= 2) {
                let obj = allPLUcodes.find(obj => obj.VARIETY.toUpperCase() == arguments[1].toUpperCase())
                console.log(obj)
                if ( typeof obj !== "undefined") {
                    if (obj.VARIETY) {
                        message.channel.send(`${obj.COMMODITY}, ${obj.VARIETY}, ${obj.SIZE}`)
                    } else {
                        message.channel.send(`${obj.COMMODITY}, -- , ${obj.SIZE}`)
                    }
                } else {
                    message.channel.send("Invalid variety")
                }
            } else if (arguments.length <= 1) {
                message.channel.send("Missing variety")
            }
        } else {
            message.channel.send("Invalid command, type '!help'")
        }
    } else {
        message.channel.send("Invalid command, type '!help'")
    }
}
// !quiz
quizCommand = (arguments, message) => {
    if (arguments.length > 0) {
        if (arguments[0].toUpperCase() === "PLU") {
            let randomIndex = Math.floor(Math.random() * allPLUcodes.length)
            console.log(randomIndex)
            let randomObject = allPLUcodes[randomIndex]
            console.log(randomObject)
            message.channel.send(`What is PLU ${randomObject.PLU}?`)
        } else if (arguments[0].toUpperCase() === "VARIETY") {
            if (arguments.length >= 2) {

            } else if (arguments.length <= 1) {
                message.channel.send("Missing variety")
            }
        } else {
            message.channel.send("Invalid command, type '!help'")
        }
    } else {
        message.channel.send("Invalid command, type '!help'")
    }
}

// Bot login
client.login(token.token)