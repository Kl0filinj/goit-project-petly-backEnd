const express = require("express");
const ctrl = require("../controllers/notices")

const {asyncWrapper} = require("../helpers")

const router = express.Router();
router.post("/", asyncWrapper(ctrl.addNotice));
router.get("/:categoryName", asyncWrapper(ctrl.getNoticesByCategories));
router.get("/:categoryName", asyncWrapper(ctrl.getNoticeById));

module.exports = router