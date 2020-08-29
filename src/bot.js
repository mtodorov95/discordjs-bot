require("dotenv").config();

const { Client } = require("discord.js");
const bot = new Client();

// Do something on 'ready' event
bot.on("ready", () => {
  console.log(`${bot.user.username} is on`);
});

// When a msg is created
bot.on("message", (message) => {
  if (message.author.bot) {
    // Ignore bots
    return;
  } else {
    console.log(`${message.author.tag} wrote ${message.content}`);
    if (message.content === "hi") {
      // message.reply("Hello!"); // Tags the user
      message.channel.send("Hello");
    }
  }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);
