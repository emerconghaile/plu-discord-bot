# PLU Discord Bot

A Discord bot for quizzing you on PLU codes

Work in progress (try the !search command)

[Add me to your Discord Server](https://discord.com/api/oauth2/authorize?client_id=829242939771191306&permissions=0&scope=bot "Bot Invite")

## About

Made with Node.js and Discord.js

Data sourced from [IFPS](https://www.ifpsglobal.com/PLU-Codes/PLU-codes-Search "IFPS")

Data stored as CSV and cleaned up with awk & sed regex

- [original .csv](https://github.com/emerconghaile/plu-discord-bot/blob/main/Commodities_20210406090430.csv)
- [awk & sed regex](https://github.com/emerconghaile/plu-discord-bot/blob/main/csvREGEX.sh)
- [clean .csv](https://github.com/emerconghaile/plu-discord-bot/blob/main/allPLUcodes.csv)


## Dependencies
- discord.js
- @fast-csv/parse
