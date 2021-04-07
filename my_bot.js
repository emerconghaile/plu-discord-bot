// Load the secret bot token
const token = require('./token.json');
// Load the fast-csv parse module
const fs = require('fs')
const csv = require('@fast-csv/parse')
// Parse csv file into an array
const dataArrFile = "allPLUcodes.csv"
const dataArr = [];
csv.parseFile(dataArrFile, {headers: true})
.on("data", data => {
  dataArr.push(data);
})
.on("end", () => {
  console.log(`Finished parsing '${dataArrFile}' for a total of ${dataArr.length} lines\n`);
  //console.log(dataArr)
});

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
    console.log("Server Names:")
    client.guilds.cache.forEach((guild) => {
        console.log(` - ${guild.name} [${guild.id}]`)


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

    console.log("\nServer: " + message.guild.name)
    console.log("Channel: " + message.channel.name)
    console.log("Command: " + primaryCommand)
    console.log("Arguments: " + arguments)

    if (primaryCommand == "help") {
        helpCommand(arguments, message)
    } else if (primaryCommand == "search") {
        searchCommand(arguments, message)
    } else {
        message.channel.send("Invalid command, type !help")
    }
}
// "!help"
helpCommand = (arguments, message) => {
    message.channel.send("Current valid commands: 1) !search")
}
// "!search"
searchCommand = (arguments, message) => {
    if (arguments[0] == "PLU" && arguments.length >= 2) {
        let obj = dataArr.find(obj => obj.PLU == arguments[1])
        console.log(obj)
        if ( typeof obj !== "undefined") {
            message.channel.send(`${obj.COMMODITY}, ${obj.VARIETY}, ${obj.SIZE}`)
        } else {
            message.channel.send("Invalid PLU")
        }
    } else if (arguments[0] == "PLU" && arguments.length <= 1) {
        message.channel.send("Missing PLU number")
    } else {
        message.channel.send("Invalid command, try '!search PLU (number)'")
    }
}

// Bot login
client.login(token.token)