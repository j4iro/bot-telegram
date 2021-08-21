require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { logger } = require("./config/logger");
const dbDatabase = require("./config/mongodb");

//controllers
const {
  listDepartments,
  listPronvinces,
  listDistricts,
  listPlacesByDistrict,
} = require("./controllers/UbigeoController");

// Middlewares
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

//database
dbDatabase
  .connect(() => {
    logger.info("database connected api");
  })
  .catch((error) => {
    logger.error("database error api %o", error);
  });

// Routes
const router = express.Router();
router.route("/api/departments").get(listDepartments);
router.route("/api/provinces").get(listPronvinces);
router.route("/api/districts").get(listDistricts);
router.route("/api/place").get(listPlacesByDistrict);

app.use(router);

app.listen(process.env.PORT, () => {
  logger.info(`Listening http://localhost:${process.env.PORT}`);
});
