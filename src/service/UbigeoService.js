const Ubigeo = require("../models/Ubigeo");

class UbigeoService {
  getDepartments() {
    // return Ubigeo.find().distinct("departamento").lean();

    return Ubigeo.aggregate([
      // your where clause: note="test2" and notetwo = "meet2"
      // {"$match" : {note:"test2", notetwo:"meet2"}},
      // group by key, score to get distinct
      {
        $group: {
          _id: {
            departamento_inei: "$departamento_inei",
            departamento: "$departamento",
          },
        },
      },
      // Clean up the output
      {
        $project: {
          _id: 0,
          departamento_inei: "$_id.departamento_inei",
          departamento: "$_id.departamento",
        },
      },
    ]);
  }

  getProvincesByDepartment(department) {
    return Ubigeo.distinct("provincia", {
      departamento_inei: department,
    }).lean();

    // return Ubigeo.aggregate([
    //   { $match: { departamento_inei: department } },
    //   {
    //     $group: {
    //       _id: {
    //         departamento_inei: "$departamento_inei",
    //         provincia_inei: "$provincia_inei",
    //         provincia: "$provincia",
    //       },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       departamento_inei: "$_id.departamento_inei",
    //       provincia_inei: "$_id.provincia_inei",
    //       provincia: "$_id.provincia",
    //     },
    //   },
    // ]);
  }

  getDistrictsByProvince(province) {
    return Ubigeo.distinct("distrito", {
      provincia: province,
    }).lean();
  }

  getDistrict(district) {
    return Ubigeo.find({
      distrito: district,
    })
      .limit(1)
      .lean();
  }
}

module.exports = UbigeoService;
