require("dotenv").config();
const dbDatabase = require("../config/mongodb");
const { logger } = require("../config/logger");
const Ubigeo = require("../models/Ubigeo");
const csv = require("csv-parser");
const fs = require("fs");

main();

async function main() {
  try {
    //conect database
    // await dbDatabase.connect();
    // logger.info("Database connection established");

    //read csv
    const csvName = "TB_UBIGEOS.csv";
    const pathStorage = require("path").join("./src/storage/");
    const filePath = `${pathStorage}${csvName}`;
    const results = [];
    logger.info(filePath);

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        // console.log(data);
        results.push(data);
      })
      .on("end", async () => {
        await Ubigeo.insertMany(results);
        console.log(results[0]);
        process.exit(0);
      });

    //insert database
  } catch (error) {
    logger.error("Error en main function %o", error);
  }
}
