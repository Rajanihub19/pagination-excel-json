const express = require("express");
const { getController, postController, getExcelController, postJsonController } = require("../controller");
const { ExcelFile, convertExcelToJson } = require("../middleware");
const router = express.Router();


// router.get("/get/:skip/:limit", getController)
router.get("/get", getController)
router.post('/post', postController);
router.post('/postJson', ExcelFile.single('file'), convertExcelToJson, postJsonController)
router.get('/getexcel', getExcelController)
module.exports = router; 
