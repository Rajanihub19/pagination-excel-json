const multer = require("multer");
const XLSX = require('xlsx')


const subjectStorage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, "./storage");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});


const ExcelFile = multer(
    {
        storage: subjectStorage,
        // limits: { fileSize: 1000000 },
    }
);
const convertExcelToJson = (req, res, next) => {
    console.log("sjalpagl=====", req.file.path);
    const workbook = XLSX.readFile(req.file.path);
    console.log("workbook: ", workbook);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const jsonData = JSON.stringify(sheetData);
    const jsonObj = JSON.parse(jsonData);
    // const quiz = jsonObj.map((obj) => {
    //     return {
    //         question: obj.question,
    //         options: obj.options.split(";"),
    //         answer: parseInt(obj.answer),
    //     };
    // });
    req.data = jsonObj;
    next();
};

module.exports = { ExcelFile, convertExcelToJson }