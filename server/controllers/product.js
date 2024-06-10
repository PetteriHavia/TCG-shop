const productRouter = require("express").Router()
const Category = require("../models/category")
const Product = require("../models/product")
const mongoose = require("mongoose")
const { userExtractor } = require("../utils/middleware")


//Testing filtering
productRouter.get("/filter", async (request, response, next) => {
  const { amount, category, rarity } = request.query;
  const filters = {}

  if (amount === "true") {
    filters.$or = [
      { 'price.amount': { $gt: 0 } },
      { 'amount': { $gt: 0 } }
    ];
  } else if (amount === "false") {
    filters.$or = [
      { 'price.amount': 0 },
      { amount: 0 }
    ];
  }

  if (category) {
    try {
      const categoryNames = category.split(",");
      const categoryObject = await Category.find({ name: { $in: categoryNames.map(name => new RegExp(`^${name}$`, 'i')) } });
      if (categoryObject.length) {
        filters.categories = { $in: categoryObject.map(category => category._id) };
      } else {
        return response.status(200).json([]);
      }
    } catch (error) {
      return next(error);
    }
  }

  if (rarity) {
    filters.rarity = { $in: rarity.split(',') };
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


productRouter.get("/status", async (request, response, next) => {
  const { status } = request.query
  try {
    const productStatus = await Product.aggregate([{ $match: { status: { $regex: new RegExp(`^${status}$`, 'i') } } }]).limit(4)
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
    const product = await Product.findOne({ slug: { $regex: new RegExp(`^${slug}$`, 'i') } })
    if (!product) {
      return response.status(400).json({ message: "Product not found" })
    }

    const populatedProduct = await product.populate("categories", { name: 1 })
    return response.status(201).json(populatedProduct)
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

    const isSingleCard = categoryObject.some(category => category.name === "Single card")

    const newProduct = new Product({
      productName: body.productName,
      categories: categoryObject.map(c => c._id),
      discount: body.discount,
      status: body.status,
      image: body.image,
      slug: body.productName.replaceAll(" ", "-"),
      price: body.price,
    })

    if (!isSingleCard) {
      newProduct.amount = body.amount || 0
      newProduct.description = body.description
    }
    if (isSingleCard) {
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