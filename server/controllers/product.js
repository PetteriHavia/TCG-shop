const productRouter = require("express").Router()
const Category = require("../models/category")
const Product = require("../models/product")
const mongoose = require("mongoose")
const { checkExistingDuplicate } = require("../utils/checkExistingDuplicate")
const { userExtractor } = require("../utils/middleware")


//Testing filtering
productRouter.get("/filter", async (request, response, next) => {
  const { amount, category, rarity } = request.query;
  const filters = {}

  if (amount === "true") {
    filters.amount = { $gt: 0 }
  } else if (amount === "false") {
    filters.amount = 0
  }

  if (category) {
    try {
      const categoryObject = await Category.findOne({ name: { $regex: new RegExp('^' + category + '$', 'i') } });
      if (categoryObject) {
        filters.category = categoryObject._id;
      } else {
        return response.status(200).json([]);
      }
    } catch (error) {
      return next(error);
    }
  }

  if (rarity) {
    filters.rarity = rarity;
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


productRouter.get("/status", async (request, response) => {
  const { status } = request.query
  try {
    const productStatus = await Product.find({ status })
    console.log(productStatus)
    if (productStatus.length === 0) {
      return response.status(404).json({ error: "No products found" })
    }
    return response.status(200).json(productStatus)
  } catch (error) {
    next(error)
  }
})

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

    const categoryObject = await Category.find({ name: { $in: body.categories } })
    if (categoryObject.length === 0) {
      return response.status(404).json({ error: "No valid categories found" })
    }

    const newProduct = new Product({
      productName: body.productName,
      categories: categoryObject.map(c => c._id),
      discount: body.discount,
      status: body.status,
      image: body.image,
      slug: body.productName.replaceAll(" ", "-"),
      price: body.price,
    })

    if (!categoryObject.name !== "Single card") {
      newProduct.amount = body.amount || 0
      newProduct.description = body.description
    }

    if (!categoryObject.name === "Single card") {
      newProduct.rarity = body.rarity,
        newProduct.setName = body.setName
    }

    const savedProduct = await newProduct.save();

    for (const category of categoryObject) {
      category.products = category.products.concat(savedProduct._id)
      await category.save()
    }

    const populatedProduct = await savedProduct.populate("categories", { name: 1 })
    response.status(201).json(populatedProduct);

  } catch (error) {
    next(error)
  }
});

productRouter.delete("/:id", async (request, response, next) => {
  const productId = request.params.id
  try {
    const product = await Product.findById(productId)
    if (!product) {
      return response.status(404).json({ error: `Product with id: ${productId} not found` })
    }

    const categoryIds = product.categories

    for (const categoryId of categoryIds) {
      await Category.findByIdAndUpdate(categoryId, { $pull: { products: productId } })
    }

    const deleteProduct = await Product.findByIdAndDelete(productId);
    if (!deleteProduct) {
      return response.status(404).json({ error: `Product with id: ${productId} not found` })
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

    const existingProduct = await Product.findById(productId)

    if (!existingProduct) {
      return response.status(404).json({ error: `Product with id: ${productId} not found` });
    }

    if (updates.categories) {
      const newCategoryObjects = await Category.find({ name: { $in: updates.categories } });
      if (!newCategoryObjects) {
        return response.status(404).json({ error: `No valid categories found` });
      }

      const oldCategoryIds = existingProduct.categories.map(c => c.toString())
      const newCategoryIds = newCategoryObjects.map(c => c._id.toString())

      for (const oldCategoryId of oldCategoryIds) {
        if (!newCategoryIds.includes(oldCategoryId)) {
          await Category.findByIdAndUpdate(oldCategoryId, { $pull: { products: productId } });
        }
      }

      for (const newCategoryId of newCategoryIds)
        if (!oldCategoryIds.includes(newCategoryId)) {
          await Category.findByIdAndUpdate(newCategoryId, { $addToSet: { products: productId } });
        }

      updates.categories = newCategoryIds
    }
    const updateProduct = await Product.findByIdAndUpdate(productId, updates, { new: true, runValidators: true });

    response.status(201).json({ message: `Product id: ${productId} updated with new data`, newData: updateProduct })

  } catch (error) {
    next(error)
  }
})

module.exports = productRouter