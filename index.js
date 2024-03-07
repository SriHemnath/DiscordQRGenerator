require("dotenv").config(); //initializes dotenv
const QRCode = require("qrcode");
const { Client, MessageAttachment, MessageEmbed } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const opts = {
  errorCorrectionLevel: "H",
  type: "terminal",
  quality: 0.95,
  margin: 1,
  color: {
    dark: "#208698",
    light: "#FFF",
  },
};

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// use this for command based response
/*
client.on("messageCreate", async (msg) => {
  let rmsg = msg.content.split("-")[0];
  switch (rmsg) {
    case "ping":
      msg.reply(`Hello ${msg.author.username}`);
      break;
    case "QRCode":
      let arrMsg = msg.content.split("-").slice(1);
      await QRCode.toFile("qrCode.png", arrMsg, opts);
      const file = new MessageAttachment("qrCode.png");
      const exampleEmbed = new MessageEmbed()
        .setTitle("Some title")
        .setImage("attachment://qrCode.png");
      await msg.reply({ embeds: [exampleEmbed], files: [file] });
      break;
  }
});
*/

//will convert whatever send to QR-Code
client.on("messageCreate", async (msg) => {
  if (msg.author.bot) {
    return;
  }
  await QRCode.toFile("qrCode.png", msg.content, opts);
  const file = new MessageAttachment("qrCode.png");
  const exampleEmbed = new MessageEmbed()
    .setTitle("Please scan below code")
    .setImage("attachment://qrCode.png");
  await msg.reply({ embeds: [exampleEmbed], files: [file] });
});

//this line must be at the very end
//signs the bot in with token
client.login(process.env.CLIENT_TOKEN);
