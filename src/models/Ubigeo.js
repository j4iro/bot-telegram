const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getDateUtc = require("../utils/getDateUtc");

const ubigeoSchema = Schema(
  {
    id_ubigeo: {
      type: Number,
      required: false,
    },
    ubigeo_reniec: {
      type: Number,
      required: false,
    },
    ubigeo_inei: {
      type: Number,
      required: false,
    },
    departamento_inei: {
      type: Number,
      required: false,
    },
    departamento: {
      type: String,
      required: false,
    },
    provincia_inei: {
      type: Number,
      required: false,
    },
    provincia: {
      type: String,
      required: false,
    },
    distrito: {
      type: String,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    macroregion_inei: {
      type: String,
      required: false,
    },
    macroregion_minsa: {
      type: String,
      required: false,
    },
    iso_3166_2: {
      type: String,
      required: false,
    },
    fips: {
      type: Number,
      required: false,
    },
    superficie: {
      type: Number,
      required: false,
    },
    altitud: {
      type: Number,
      required: false,
    },
    latitud: {
      type: Number,
      required: false,
    },
    longitud: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
      currentTime: () => getDateUtc(),
    },
  }
);

module.exports = mongoose.model("Ubigeo", ubigeoSchema);
