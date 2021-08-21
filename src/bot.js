require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const bot = new Telegraf(process.env.BOT_TOKEN);

const dbDatabase = require("./config/mongodb");
const PlaceService = require("./service/PlacesService");
const placeService = new PlaceService();

bot.start((ctx) => {
  // ctx.reply(
  //   "Bien empecemos, antes que nada indícame como quieres consultar los centro de vacunación"
  // );

  // ctx.reply(
  //   "Bien empecemos, antes que nada indícame como quieres consultar los centro de vacunación",
  //   {
  //     reply_markup: {
  //       inline_keyboard: [
  //         /* Inline buttons. 2 side-by-side */
  //         [
  //           { text: "Por ubicación", callback_data: "location" },
  //           { text: "Por distrito", callback_data: "district" },
  //         ],
  //         /* Also, we can have URL buttons. */
  //         // [{ text: "Open in browser", url: "telegraf.js.org" }],
  //       ],
  //     },
  //   }
  // );

  return ctx.reply(
    "Bien empecemos, antes que nada indícame como quieres consultar los centro de vacunación",
    Markup.keyboard([
      Markup.button.callback("/pordistrito"),
      Markup.button.locationRequest("Enviar mi ubicación"),
    ]).resize()
  );
});

bot.command("/pordistrito", (ctx) => {
  ctx.reply(
    `Escribeme tu departamento, provincia y distrito, con este comando 👉 ejemplo: /distrito Lima, Lima, Lince`
  );
});

bot.command("/distrito", (ctx) => {
  ctx.reply(`Estos son los lugares de vacunación en el distrito seleccionado`);
});

bot.on("location", async (ctx) => {
  console.log(ctx.message);
  const latitude = ctx.message.location.latitude;
  const longitude = ctx.message.location.longitude;

  const resultDb = await placeService.getPlacesNearByCoordinates({
    latitude,
    longitude,
    limit: 7,
  });
  // console.log(resultDb);

  let messageReply = `Estos son los 5 lugares de vacunación mas cercanos a tu ubicación 👇:

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

bot.help((ctx) => {
  ctx.reply(``);
});

bot.on("photo", (ctx) => {
  console.dir(ctx.message, { depth: null });
  console.log(ctx);
  ctx.reply("👍");
});

bot.launch();
