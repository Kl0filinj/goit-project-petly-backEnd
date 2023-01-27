const { model } = require('mongoose');
const { newsSchema } = require("../schemas/news")

const News = model("news", newsSchema);

module.exports = News;
