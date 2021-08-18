const Place = require("../models/Place");

class PlaceService {
  getPlacesNearByCoordinates({ latitude, longitude }) {
    return Place.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [longitude, latitude] },
          spherical: true,
          distanceField: "calcDistance",
        },
      },
      { $limit: 5 },
    ]);
  }
}

module.exports = PlaceService;
