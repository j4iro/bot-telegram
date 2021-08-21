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
  getPlacesNearByCoordinates,
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
router.route("/api/places-district").get(listPlacesByDistrict);
router.route("/api/places").get(getPlacesNearByCoordinates);

app.use(router);

app.listen(process.env.PORT, () => {
  logger.info(`Listening http://localhost:${process.env.PORT}`);
});
