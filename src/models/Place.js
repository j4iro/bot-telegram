const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getDateUtc = require("../utils/getDateUtc");

const placeSchema = Schema(
  {
    id_center_vaccination: {
      type: Number,
      required: true,
    },
    id_ubigeo: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    entity: {
      type: String,
      required: false,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: Array,
        required: true,
      },
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

module.exports = mongoose.model("Place", placeSchema);
