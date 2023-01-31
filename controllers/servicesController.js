const { Service } = require("../models/serviceModel");


const servicesController = async (req, res, next) => {
    const result = await Service.find()

  if (!result) {
    throw RequestError(404, "Not found");
  }

    return res.json(result)
}

module.exports = {
    servicesController,
};