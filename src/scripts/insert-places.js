require("dotenv").config();
const dbDatabase = require("../config/mongodb");
const { logger } = require("../config/logger");
const Place = require("../models/Place");
const csv = require("csv-parser");
const fs = require("fs");

main();

async function main() {
  try {
    //conect database
    // await dbDatabase.connect();
    // logger.info("Database connection established");

    //read csv
    const csvName = "TB_CENTRO_VACUNACION.csv";
    const pathStorage = require("path").join("./src/storage/");
    const filePath = `${pathStorage}${csvName}`;
    const results = [];
    logger.info(filePath);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        // console.log(data);
        results.push({
          id_center_vaccination: data["id"],
          id_ubigeo: data.id_ubigeo,
          name: data.nombre,
          entity: data.entidad_administra,
          location: {
            coordinates: [parseFloat(data.longitud), parseFloat(data.latitud)],
          },
        });
      })
      .on("end", async () => {
        await Place.insertMany(results);
        console.log(results[0].location);
      });

    //insert database
  } catch (error) {
    logger.error("Error en main function %o", error);
  }
}
