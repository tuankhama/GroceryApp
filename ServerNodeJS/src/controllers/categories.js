const categorySchema = require("../models/category")


const getAllCategories = async () => {
    try {
        const categories = await categorySchema.find({})
        return {
            status: true,
            message: "Lấy danh sách categories thành công",
            data: categories
        }
    } catch (error) {
        return {
            status: false,
            message: "Lấy danh sách categories thất bại" + error,
            data: null,
        }
    }

}



module.exports = {
    getAllCategories
}