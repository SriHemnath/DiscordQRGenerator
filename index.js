require("dotenv").config(); //initializes dotenv
const QRCode = require("qrcode");
const { Client, GatewayIntentBits, AttachmentBuilder } = require("discord.js"); //imports discord.js
const Discord = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
}); //creates new client

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

client.on("messageCreate", async (msg) => {
  let rmsg = msg.content.split("-")[0];
  switch (rmsg) {
    case "ping":
      msg.reply(`Hello ${msg.author.username}`);
      break;
    case "QRCode":
      let arrMsg = msg.content.split("-").slice(1);
      await QRCode.toFile("qrCode.png", arrMsg, opts);

      // const qrCodeBuffer = await QRCode.toBuffer(arrMsg);
      const attachment = new AttachmentBuilder({
        attachment:
          "D:\project\src\github.com\SriHemnath\DiscordQRGenerator\qrCode.png",
        name: "qrcode.png",
      });
      await msg.reply("Here is your QR code:", attachment);
      break;
  }
});

//this line must be at the very end
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
