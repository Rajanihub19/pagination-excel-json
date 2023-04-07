const { getModel, postModel, getExcelModel, postJsonModel } = require("../model");
const XLSX = require('xlsx')

const getController = async (req, res) => {
    const data = req.query
    console.log("data", data)
    const result = await getModel(data);
    res.send(result);
}
const postController = async (req, res) => {
    const result = await postModel(req.body);
    res.send(result);
}
const getExcelController = async (req, res) => {
    const result = await getExcelModel()
    console.log("result", result.response);
    try {
        const workSheet = XLSX.utils.json_to_sheet(JSON.parse(JSON.stringify(result.response)))

        const workBook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workBook, workSheet, "students")
        // Generate buffer
        // XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })

        // Binary string
        // XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

        XLSX.writeFile(workBook, "studentsData.xlsx")
        return res.send({
            response: 'done', message: "success", status: 200,
        })
    }
    catch (error) {
        console.log("error", error)
        return res.send({ response: error, message: "error", status: 400 });


        // res.send("successfully send");
    }
}
const postJsonController = async (req, res) => {
    // console.log("req====", req)

    console.log("body======", req.data)
    // const files = req?.file?.path;
    // const temp = { ...req.body, image: files }
    const temp = req.data
    const result = await postJsonModel(temp);
    res.send(result);
}
module.exports = { getController, postController, getExcelController, postJsonController }
