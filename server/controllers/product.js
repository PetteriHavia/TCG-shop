const productRouter = require("express").Router()
const Category = require("../models/category")
const Product = require("../models/product")
const mongoose = require("mongoose")
const { checkExistingDuplicate } = require("../utils/checkExistingDuplicate")
const { userExtractor } = require("../utils/middleware")


//Testing filtering
productRouter.get("/filter", async (request, response, next) => {
  const { availability, type, rarity, status } = request.query;
  const filters = {}

  if (availability) {
    filters.availability = availability;
  }

  if (type) {
    filters.type = type;
  }

  if (rarity) {
    filters.rarity = rarity;
  }

  if (status) {
    filters.status = status;
  }

  try {
    const products = await Product.find(filters)
    if (products.length === 0) {
      return response.status(404).json({ error: "No products found" })
    }
    response.status(200).json(products)
  } catch (error) {
    next(error)
  }
});

productRouter.get("/", async (request, response, next) => {
  try {
    const products = await Product.find({})
    if (products.length === 0) {
      return response.status(404).json({ error: "No products found" })
    }
    response.status(200).json(products)
  } catch (error) {
    next(error)
  }
});

productRouter.get("/:slug", async (request, response, next) => {
  const slug = request.params.slug.replaceAll(" ", '-')
  try {
    if (mongoose.Types.ObjectId.isValid(slug)) {
      const product = await Product.findById(slug)
      if (!product) {
        return response.status(400).json({ message: "Product not found" })
      }
      return response.status(201).json(product)
    }
    const product = await Product.findOne({ slug: slug })
    if (!product) {
      return response.status(400).json({ message: "Product not found" })
    }
    return response.status(201).json(product)
  } catch (error) {
    next(error)
  }
})


productRouter.post("/", userExtractor, async (request, response, next) => {
  const body = request.body
  try {

    if (!request.user) {
      return response.status(401).json({ error: "User not authenticated" })
    }

    const categoryId = await Category.findOne({ name: body.category })
    if (!categoryId) {
      return response.status(404).json({ error: "Category not found" })
    }

    if (await checkExistingDuplicate(Product, 'productName', body.productName)) {
      return response.status(500).json({ error: `Product name: ${body.productName} already exists` })
    }

    const newProduct = new Product({
      productName: body.productName,
      category: categoryId._id,
      discount: body.discount,
      status: body.status,
      description: body.description,
      image: body.image,
      slug: body.productName.replaceAll(" ", "-"),
      price: body.price,
    })

    if (categoryId.name !== "Single card") {
      newProduct.amount = body.amount || 0;
    }

    if (categoryId.name === "Single card") {
      newProduct.rarity = body.rarity
    }

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
  const productId = request.params.id
  try {
    const deleteProduct = await Product.findByIdAndDelete(productId)
    if (!deleteProduct) {
      return response.status(404).json({ error: `Product with id: ${productId} not found` })
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

  try {

    if (Object.keys(updates).length === 0) {
      return response.status(404).json({ error: `No update data provided` })
    }
    const updateProduct = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true })

    if (!updateProduct) {
      return response.status(404).json({ error: `Product with id: ${productId} not found` })
    }
    response.status(201).json({ message: `Product id: ${productId} updated with new data`, newData: updates })

  } catch (error) {
    next(error)
  }
})

module.exports = productRouter