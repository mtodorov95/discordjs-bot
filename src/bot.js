require("dotenv").config();

const { Client } = require("discord.js");
const bot = new Client({
  partials: ["MESSAGE", "REACTION"],
});
const PREFIX = "$";

// Do something on 'ready' event
bot.on("ready", () => {
  console.log(`${bot.user.username} is on`);
});

// When a msg is created
bot.on("message", async (message) => {
  if (message.author.bot) {
    // Ignore bots
    return;
  }
  if (message.content === "hi") {
    // message.reply("Hello!"); // Tags the user
    message.channel.send("Hello");
  }

  // Handle commands
  if (message.content.startsWith(PREFIX)) {
    // Split command and an array of args
    const [CMD_NAME, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    // Kick a user
    if (CMD_NAME === "kick") {
      // Check if the author has permissions
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.reply("You do not have the right to do that");
      // Check for an id
      if (args.length === 0) return message.reply("You need to provide an ID");
      // Get user on the server by the id
      const member = message.guild.members.cache.get(args[0]);
      if (member) {
        member
          .kick()
          .then((member) => message.channel.send(`${member} was kicked`))
          .catch((err) =>
            message.channel.send("I do not have the power to kick that user")
          );
      } else {
        message.channel.send("User was not found");
      }
    }

    // Ban a user
    if (CMD_NAME === "ban") {
      if (!message.member.hasPermission("BAN_MEMBERS"))
        return message.reply("You do not have the right to do that");
      if (args.length === 0) return message.reply("You need to provide an ID");
      try {
        const user = await message.guild.members.ban(args[0]);
        message.channel.send("User was banned successfully");
      } catch (error) {
        console.log(error);
        message.channel.send("An error occured while trying to ban the user");
      }
    }
  }
});

// Add role to user on msg reaction
bot.on("messageReactionAdd", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  // Msg ID that was reacted to
  if (reaction.message.id === "749186524406480976") {
    switch (name) {
      case "🍎":
        member.roles.add("749189686802514055"); // Role ID
        break;
      case "🍌":
        member.roles.add("749189713159782440");
        break;
      case "🍇":
        member.roles.add("749189735129415731");
        break;
      case "🍑":
        member.roles.add("749189762916810852");
        break;
    }
  }
});

// Remove role to user on msg reaction removal
bot.on("messageReactionRemove", (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === "749186524406480976") {
    switch (name) {
      case "🍎":
        member.roles.remove("749189686802514055");
        break;
      case "🍌":
        member.roles.remove("749189713159782440");
        break;
      case "🍇":
        member.roles.remove("749189735129415731");
        break;
      case "🍑":
        member.roles.remove("749189762916810852");
        break;
    }
  }
});

bot.login(process.env.DISCORDJS_BOT_TOKEN);
