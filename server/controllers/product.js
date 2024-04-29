const productRouter = require("express").Router()
const Category = require("../models/category")
const Product = require("../models/product")

productRouter.get("/", async (request, response, next) => {
  try {
    const products = await Product.find({})
    if (products.length === 0) {
      return response.status(404).json({ message: "No products found" })
    }
    response.status(200).json(products)
  } catch (error) {
    next(error)
  }
});

productRouter.post("/", async (request, response, next) => {

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
    next(error)
  }
});

productRouter.delete("/:id", async (request, response, next) => {
  const productId = request.body.id
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId)
    if (!deleteProduct) {
      response.status(404).json({ error: `Product with id: ${productId} not found` })
      return
    }

    const category = await Category.findOneAndUpdate(
      { products: productId },
      { $pull: { products: productId } },
      { new: true }
    )

    if (!category) {
      response.status(404).json({ error: `Category not found for product: ${productId}` })
    }

    response.status(201).json(`Product id ${productId} deleted`)
  } catch (error) {
    next(error)
  }

});

productRouter.patch("/:id", async (request, response, next) => {
  const productId = request.params.id
  const updates = request.body
<<<<<<< HEAD

=======
  console.log(productId)
>>>>>>> 7a18db791a742b05a3fbf2be713213d8f5d6cedf
  try {

    if (Object.keys(updates).length === 0) {
      return response.status(404).json({ error: `No update data provided` })
    }
    const updateProduct = await Product.findByIdAndUpdate(productId, updates, { new: true })

    if (!updateProduct) {
      return response.status(404).json({ error: `Product with id: ${productId} not found` })
    }
    response.status(201).json({ message: "Product id: ${productId} updated with new data", newData: updates })

  } catch (error) {
    next(error)
  }
})

module.exports = productRouter