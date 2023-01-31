const { News } = require("../models/newsModel");
const RequestError = require('../helpers/RequestError');


const newsController = async (req, res, next) => {
    const result = await News.find({})

  if (!result) {
    throw RequestError(404, "Not found");
  }

    return res.json(result)
}

module.exports = {
    newsController,
};