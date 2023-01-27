const express = require('express');

const controllers = require("../../controllers/news");
// const { newsSchema } = require('../../schemas/news');


const router = express.Router();

router.get('/', controllers.getAll);

module.exports = router;