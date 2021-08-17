require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply("Welcome");
});

bot.command("remedar", (ctx) => {
  console.log(ctx.message);

  const messageRaw = ctx.message.text.replace("/remedar", "");
  const vocals = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  let newMessage = "";
  for (let i in vocals) {
    console.log(i, vocals[i], messageRaw);
    if (i == 0) {
      newMessage = messageRaw.replace(new RegExp(vocals[i], "g"), "i");
    } else {
      newMessage = newMessage.replace(new RegExp(vocals[i], "g"), "i");
    }
    console.log(newMessage);
  }

  ctx.reply(newMessage);
});

bot.launch();
