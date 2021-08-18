require("dotenv").config();
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

const dbDatabase = require("./config/mongodb");
const PlaceService = require("./service/PlacesService");
const placeService = new PlaceService();

bot.start((ctx) => {
  ctx.reply(
    "Enviame tu ubicación y te diré los lugares de vacunación mas cercanos a tu ubicación"
  );
});

bot.on("location", async (ctx) => {
  console.log(ctx.message);
  const latitude = ctx.message.location.latitude;
  const longitude = ctx.message.location.longitude;

  const resultDb = await placeService.getPlacesNearByCoordinates({
    latitude,
    longitude,
  });
  console.log(resultDb);

  let messageReply = `Estos son los 5 lugares de vacunación mas cercanos a tu ubicación:

  `;
  resultDb.forEach((element, i) => {
    messageReply += `${i + 1}. ${
      element.name
    } 👉 Mira su mapa aquí: https://www.google.com/maps/search/?api=1&query=${
      element.location.coordinates[1]
    },${element.location.coordinates[0]}
    
    `;
  });

  ctx.reply(messageReply);
});

bot.on("sticker", (ctx) => {
  console.dir(ctx.message, { depth: null });
  // ctx.reply("👍");

  ctx.replyWithSticker(
    "CAACAgIAAxkBAANTYRx1-zoXHQUSTY5pQIrlUyW_KToAAi4BAAIy5PUFdcFznPqwNWIgBA"
  );
});

bot.on("photo", (ctx) => {
  console.dir(ctx.message, { depth: null });
  console.log(ctx);
  ctx.reply("👍");
});

bot.launch();
