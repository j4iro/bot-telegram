const Place = require("../models/Place");

class PlaceService {
  getPlacesNearByCoordinates({ latitude, longitude, limit }) {
    if (limit === undefined) {
      limit = 5;
    }

    return Place.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          spherical: true,
          distanceField: "calcDistance",
        },
      },
      { $limit: limit },
    ]);
  }
}

module.exports = PlaceService;
