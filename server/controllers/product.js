const productRouter = require("express").Router()
const Category = require("../models/category")
const Product = require("../models/product")

productRouter.get("/", async (request, response) => {
  try {
    const products = await Product.find({})
    response.status(200).json(products)
  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

productRouter.post("/", async (request, response) => {

  const body = request.body
  console.log(body)

  const categoryId = await Category.findOne({ name: body.category })
  console.log("testing", categoryId)

  try {
    const newProduct = {
      productName: body.productName,
      category: categoryId.id,
      discount: body.discount,
      status: body.status,
      description: body.description,
      image: body.image,
      price: body.price,
    }
    console.log(newProduct)
    //const savedProduct = await newProduct.save();

    //const populatedProduct = await savedProduct.populate("category")

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = productRouter