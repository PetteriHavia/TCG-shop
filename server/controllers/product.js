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

  try {

    const categoryId = await Category.findOne({ name: body.category })
    if (!categoryId) {
      return response.status(404).json({ error: "Category not found" })
    }

    const newProduct = new Product({
      productName: body.productName,
      category: categoryId._id,
      discount: body.discount,
      status: body.status,
      description: body.description,
      image: body.image,
      price: body.price,
    })

    console.log(newProduct)

    const savedProduct = await newProduct.save();

    //Populate product category section with category name
    const populatedProduct = await savedProduct.populate("category", { name: 1 })

    categoryId.products = categoryId.products.concat(savedProduct._id)
    await categoryId.save()

    response.status(201).json(populatedProduct);

  } catch (error) {
    response.status(500).json({ error: error.message })
  }
})

module.exports = productRouter