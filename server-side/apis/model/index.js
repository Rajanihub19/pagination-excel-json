const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: String,
    image: String
});
const taskModel = new mongoose.model("users", taskSchema);
const getModel = async (data) => {
    try {
        let { page, size } = data;
        if (!page) {

            // Make the Default value one.
            page = 1;
        }

        if (!size) {
            size = 10;
        }

        //  We have to make it integer because
        // query parameter passed is string
        const limit = parseInt(size);

        const response = await taskModel.find().skip(page)
            .limit(limit);
        const length = await taskModel.count();

        return {
            response, message: "success", status: 200,
            page,
            size,
            length
        };
    } catch (error) {
        return { response: error, message: "error", status: 400 };
    }
};
const getExcelModel = async () => {
    try {
        const response = await taskModel.find()

        return {
            response, message: "success", status: 200,

        };
    } catch (error) {
        return { response: error, message: "error", status: 400 };
    }

}
const postModel = async (values) => {
    console.log("post data: ", values);
    try {
        console.log("kuchbhi", values)
        const response = await taskModel.create(values);
        console.log("kuchbhi2", values)
        return { response, message: "success", status: 200 };
    } catch (error) {
        console.log("error=========", error)
        return { response: error, message: "error", status: 400 };
    }
};
const postJsonModel = async (values) => {
    console.log("post data: ", values);
    try {

        const response = await taskModel.create(values);

        return { response, message: "success", status: 200 };
    } catch (error) {
        console.log("error------", error)
        return { response: error, message: "error", status: 400 };
    }
};
module.exports = { getModel, postModel, taskModel, getExcelModel, postJsonModel }