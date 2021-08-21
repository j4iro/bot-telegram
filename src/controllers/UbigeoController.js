const UbigeoService = require("../service/UbigeoService");
const PlacesService = require("../service/PlacesService");

const ubigeoService = new UbigeoService();
const placesService = new PlacesService();

async function listDepartments(req, res, next) {
  try {
    const result = await ubigeoService.getDepartments();

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function listPronvinces(req, res, next) {
  try {
    const departament = req.query.departament || 0;
    // console.log(departament);
    const result = await ubigeoService.getProvincesByDepartment(departament);

    const newResult = result.map((element) => {
      return { provincia: element };
    });

    return res.status(200).json({
      data: newResult,
    });
  } catch (error) {
    next(error);
  }
}

async function listDistricts(req, res, next) {
  try {
    const province = req.query.province || 0;
    // console.log(province);
    const result = await ubigeoService.getDistrictsByProvince(province);

    const newResult = result.map((element) => {
      return { distrito: element };
    });

    return res.status(200).json({
      data: newResult,
    });
  } catch (error) {
    next(error);
  }
}

async function listPlacesByDistrict(req, res, next) {
  try {
    //get coordinates from district
    const district = req.query.district || 0;
    const districtDB_ = await ubigeoService.getDistrict(district);
    const districtDB = districtDB_[0];

    // const latitude = parseFloat(districtDB.latitud);
    // const longitude = parseFloat(districtDB.longitud);

    const latitude = districtDB.latitud;
    const longitude = districtDB.longitud;

    console.log(districtDB);
    console.log(latitude, longitude);

    const placesDB = await placesService.getPlacesNearByCoordinates({
      latitude: latitude,
      longitude: longitude,
    });

    return res.status(200).json({
      data: placesDB,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listDepartments,
  listPronvinces,
  listDistricts,
  listPlacesByDistrict,
};
