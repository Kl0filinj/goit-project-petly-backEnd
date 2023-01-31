const express = require("express");

const { newsController } = require("../controllers/newsController");
const { asyncWrapper } = require("../helpers/apiHelpers");

const router = express.Router();

router.get("/", asyncWrapper(newsController));

module.exports = router;


