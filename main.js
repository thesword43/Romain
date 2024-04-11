/* QUACK QUACK */
/* Romain Bot */

/* Currently includes 
-reactions command to assign reactions to names
(command is -reactions "name" ":emoji:")
-pickmeup
-oneline
-fortunecookie
-addoneline
-addpickup
-addfortune
-quote
-addquote */

const fs = require("fs");
const path = require("path");
const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const token = process.env.DISCORD_TOKEN;
const reactionsFilePath = path.join(__dirname, "reactions.json");
const pickMeUpFilePath = path.join(__dirname, "data", "pickmeup.txt");
const onelinersFilePath = path.join(__dirname, "data", "oneliners.txt");
const fortuneCookieFilePath = path.join(__dirname, "data", "fortunecookie.txt");
const quoteFilePath = path.join(__dirname, "data", "quote.txt");

let reactionMap = new Map();
function loadReactions() {
  if (fs.existsSync(reactionsFilePath)) {
    const data = fs.readFileSync(reactionsFilePath, "utf8");
    return new Map(JSON.parse(data));
  } else {
    return new Map();
  }
}
reactionMap = loadReactions();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
  reactionMap = loadReactions();
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  /* PICK ME UP CODE */
  if (msg.content.toLowerCase() === "-pickmeup") {
    msg.channel.sendTyping();

    const filePath = pickMeUpFilePath;

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return msg.reply("Error reading file");
      }

      const lines = data.split("\n");

      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      msg.reply(randomLine);
    });
  }

  /* Add Pick Me Up */
  if (msg.content.toLowerCase().startsWith("-addpickup")) {
    const staffRoleId = "1227804525000134687";
    if (!msg.member.roles.cache.has(staffRoleId)) {
      return msg.reply("You do not have permission to use this command.");
    }

    const newLine = msg.content.substring("-addpickup".length).trim();
    if (!newLine) {
      return msg.reply("Please provide a pick me up line to add.");
    }

    // Extract the pick me up line from the message content without surrounding quotes
    const pickMeUpLine = newLine.replace(/^"|"$/g, "").trim();

    fs.appendFile(pickMeUpFilePath, `\n${pickMeUpLine}`, { flag: "a+" }, (err) => {
      if (err) {
        console.error(err);
        return msg.reply("Error adding the pick me up line.");
      }
      msg.reply("Pick me up line added successfully!");
    });
  }

  /* One Liners Code */
  if (msg.content.toLowerCase() === "-oneline") {
    msg.channel.sendTyping();

    const filePath = onelinersFilePath;

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return msg.reply("Error reading file");
      }

      const lines = data.split("\n");

      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      msg.reply(randomLine);
    });
  }

  /* Add One Liner */
  if (msg.content.toLowerCase().startsWith("-addoneline")) {
    const staffRoleId = "1227804525000134687";
    if (!msg.member.roles.cache.has(staffRoleId)) {
      return msg.reply("You do not have permission to use this command.");
    }

    const newLine = msg.content.substring("-addoneline".length).trim();
    if (!newLine) {
      return msg.reply("Please provide a one-liner to add.");
    }

    // Extract the one-liner from the message content without surrounding quotes
    const oneLiner = newLine.replace(/^"|"$/g, "").trim();

    fs.appendFile(onelinersFilePath, `\n${oneLiner}`, { flag: "a+" }, (err) => {
      if (err) {
        console.error(err);
        return msg.reply("Error adding the one-liner.");
      }
      msg.reply("One-liner added successfully!");
    });
  }

  /* Fortune Cookie */
  if (msg.content.toLowerCase() === "-fortune") {
    msg.channel.sendTyping();

    const filePath = fortuneCookieFilePath;

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return msg.reply("Error reading file");
      }

      const lines = data.split("\n");

      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      msg.reply(randomLine);
    });
  }
  
  /* Add Fortune Cookie */
  if (msg.content.toLowerCase().startsWith("-addfortune")) {
    const staffRoleId = "1227804525000134687";
    if (!msg.member.roles.cache.has(staffRoleId)) {
      return msg.reply("You do not have permission to use this command.");
    }

    const newLine = msg.content.substring("-addfortune".length).trim();
    if (!newLine) {
        return msg.reply("Please provide a fortune to add.");
    }

    // Append the new fortune to the file
    fs.appendFile(fortuneCookieFilePath, `\n${newLine}`, { flag: "a+" }, (err) => {
        if (err) {
            console.error(err);
            return msg.reply("Error adding the fortune.");
        }
        msg.reply("Fortune added successfully!");
    });
  }

  /* quotes */
  if (msg.content.toLowerCase() === "-quote") {
    msg.channel.sendTyping();

    const filePath = quoteFilePath;

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return msg.reply("Error reading file");
      }

      const lines = data.split("\n");

      const randomLine = lines[Math.floor(Math.random() * lines.length)];

      msg.reply(randomLine);
    });
  }

 /* Add Quote */
if (msg.content.toLowerCase().startsWith("-addquote")) {
  const staffRoleId = "1227804525000134687";
  if (!msg.member.roles.cache.has(staffRoleId)) {
    return msg.reply("You do not have permission to use this command.");
  }

  const newQuote = msg.content.substring("-addquote".length).trim();
  if (!newQuote) {
      return msg.reply("Please provide a quote to add.");
  }

  // Append the new quote to the file
  fs.appendFile(quoteFilePath, `\n${newQuote}`, { flag: "a+" }, (err) => {
      if (err) {
          console.error(err);
          return msg.reply("Error adding the quote.");
      }
      msg.reply("Quote added successfully!");
  });
}
  
  /* REACTIONS CODE */
if (msg.content.toLowerCase().startsWith("/reactions")) {
  const staffRoleId = "1227804525000134687";
  if (!msg.member.roles.cache.has(staffRoleId)) {
      return msg.reply("You do not have permission to use this command.");
  }

  const args = msg.content.match(/(?:[^\s"]+|"[^"]*")+/g).slice(1); 
  const username = args[0].replace(/"/g, "").trim(); 
  const emoji = args[1].replace(/"/g, "").trim(); 

  if (!username || !emoji) {
      return msg.reply("Please provide both a username and an emoji.");
  }

  // Set up the reaction map with the user's ID and emoji
  reactionMap.set(username.toLowerCase(), emoji);

  // Write to reactions.json
  fs.writeFileSync(reactionsFilePath, JSON.stringify([...reactionMap]));

  msg.reply(`Reactions set for ${username} with emoji ${emoji}`);
}

// React with designated emoji for any mentioned name in the reactionMap
for (const [username, emoji] of reactionMap.entries()) {
  if (msg.content.toLowerCase().includes(username) && reactionMap.has(username)) {
      msg.react(emoji);
        }
    }
});

client.login(token);
