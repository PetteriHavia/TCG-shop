const categoryRouter = require("express").Router()
const category = require("../models/category")
const Category = require("../models/category")
const Product = require("../models/product")
const { checkExistingDuplicate } = require("../utils/checkExistingDuplicate")
const mongoose = require("mongoose")

categoryRouter.get("/:category/filter", async (request, response, next) => {
  const { category } = request.params;
  const { availability, rarity, type } = request.query;
  const filters = request.query

  if (availability === "false") {
    filters.$or = [
      { 'price.amount': { $gt: 0 } },
      { 'amount': { $gt: 0 } }
    ];
  } else if (availability === "true") {
    filters.$or = [
      { 'price.amount': 0 },
      { 'amount': 0 }
    ];
  }

  if (rarity) {
    filters.rarity = { $in: rarity.split(',') };
  }

  if (type) {
    filters.type = { $in: type.split(',') };
  }

  console.log(filters)

  try {
    if (category == "all") {
      const products = await Product.find(filters)
      return response.status(201).json({ name: "all", products })
    } else {
      const categoryObject = await Category.findOne({ name: new RegExp(`^${category}$`, 'i') })
        .populate({
          path: 'products', populate: { path: "categories", model: "Category", select: "_id name" }
        })
      if (!categoryObject) {
        return response.status(404).json({ error: "Category not found" })
      }

      const filteredProducts = categoryObject.products.filter(product => {
        let hasPositiveAmount = false;
        if (Array.isArray(product.price)) {
          hasPositiveAmount = product.price.some(price => price.amount > 0)
        } else {
          hasPositiveAmount = product.price > 0
        }

        if (availability === "false" && !hasPositiveAmount && product.amount <= 0) {
          return false
        }
        if (availability === "true" && (hasPositiveAmount || product.amount > 0)) {
          return false
        }
        if (rarity && !filters.rarity.$in.includes(product.rarity)) {
          return false;
        }
        if (type) {
          const typeNames = type.split(',');
          const productCategoryNames = categoryObject.products
            .filter(p => p._id.toString() === product._id.toString())
            .flatMap(p => p.categories.map(cat => cat.name))
            .filter(Boolean);

          if (!typeNames.some(t => productCategoryNames.includes(t))) {
            return false;
          }
        }
        return true
      });
      console.log(filteredProducts)
      return response.status(201).json({ name: categoryObject.name, products: filteredProducts })
    }
  } catch (error) {
    next(error)
  }
})

/*
categoryRouter.get("/:category/filter", async (request, response, next) => {
  const { category } = request.params;
  const { availability, rarity, type } = request.query;
  const filters = {};

  if (availability === "false") {
    filters.$or = [
      { 'price.amount': { $gt: 0 } },
      { 'amount': { $gt: 0 } }
    ];
  } else if (availability === "true") {
    filters.$or = [
      { 'price.amount': 0 },
      { 'amount': 0 }
    ];
  }

  if (rarity) {
    filters.rarity = { $in: rarity.split(',') };
  }

  try {
    let categoryObject;

    if (category === "all") {
      if (type) {
        // Filter products where at least one category name matches the type
        filters['categories.name'] = { $in: type.split(',') };
      }

      categoryObject = await Product.find(filters)
        .populate({
          path: 'categories',
          model: 'Category',
          select: '_id name'
        });

      return response.status(200).json({ name: "all", products: categoryObject });
    } else {
      categoryObject = await Category.findOne({ name: new RegExp(`^${category}$`, 'i') })
        .populate({
          path: 'products',
          populate: { path: "categories", model: "Category", select: "_id name" }
        });

      if (!categoryObject) {
        return response.status(404).json({ error: "Category not found" });
      }

      const filteredProducts = categoryObject.products.filter(product => {
        // Implement your filtering logic here
        let includeProduct = true;

        if (availability === "false" && product.amount > 0) {
          includeProduct = false;
        } else if (availability === "true" && product.amount <= 0) {
          includeProduct = false;
        }

        if (rarity && !product.rarity.includes(rarity)) {
          includeProduct = false;
        }

        if (type) {
          // Check if any category name matches the type filter
          const typeNames = type.split(',');
          const productCategoryNames = product.categories.map(cat => cat.name);

          if (!typeNames.some(t => productCategoryNames.includes(t))) {
            includeProduct = false;
          }
        }

        return includeProduct;
      });

      return response.status(200).json({ name: categoryObject.name, products: filteredProducts });
    }
  } catch (error) {
    next(error);
  }
})*/

categoryRouter.get("/:identifier", async (request, response, next) => {
  const identifier = request.params.identifier;
  try {
    let category;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      category = await Category.findById(identifier).populate("products", {
        productName: 1, price: 1, status: 1, id: 1, discount: 1, setName: 1, img: 1
      })
    } else {
      category = await Category.findOne({ name: { $regex: new RegExp(`^${identifier}$`, 'i') } })
        .populate("products")
    }
    if (!category) {
      return response.status(404).json({ error: "No category found" })
    }
    response.status(201).json(category)
  } catch (error) {
    next(error)
  }
})

categoryRouter.get("/:category/:identifier", async (request, response, next) => {
  const { category, identifier } = request.params;
  console.log(category, identifier)
  try {
    const categoryName = await Category.findOne({ name: { $regex: new RegExp(`^${category}$`, 'i') } })
      .populate({
        path: 'products', populate: { path: "categories", model: "Category", select: "_id name" }
      })
    if (!categoryName) {
      return response.status(404).json({ error: "No category found" })
    }
    const product = categoryName.products.find(product => product.slug === identifier)
    if (!product) {
      return response.status(404).json({ error: "Product not found" })
    }
    return response.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

categoryRouter.get("/", async (request, response, next) => {
  try {
    const categories = await Category.find({}).populate("products", {
      productName: 1, price: 1, status: 1, discount: 1, setName: 1, img: 1
    })
    if (!categories) {
      return response.status(404).json({ error: "No categories found" })
    }

    response.status(201).json(categories)
  } catch (error) {
    next(error)
  }
})

categoryRouter.post("/", async (request, response, next) => {
  const body = request.body
  try {

    if (!body.name) {
      return response.status(404).json({ error: "No new data provided" })
    }

    if (await checkExistingDuplicate(Category, "name", body.name)) {
      return response.status(500).json({ error: "Category name already exists" })
    }

    const newCategory = new Category({
      name: body.name,
      group: body.group
    })

    const SavedCategory = await newCategory.save()
    response.status(201).json({ message: `new category added`, data: SavedCategory.name })
  } catch (error) {
    next(error)
  }
})

categoryRouter.delete("/:id", async (request, response, next) => {
  const categoryId = request.params.id
  try {
    const deleteCategory = await Category.findByIdAndDelete(categoryId)
    if (!deleteCategory) {
      return response.status(404).json({ error: "Category not found" })
    }
    return response.status(201).json(`Category ${deleteCategory.name} deleted`)
  } catch (error) {
    next(error)
  }
})

categoryRouter.patch("/:id", async (request, response, next) => {
  const categoryId = request.params.id
  const updates = request.body

  try {
    if (Object.keys(updates).length === 0) {
      return response.status(404).json({ error: `No update data provided` })
    }

    const updateCategory = await Category.findByIdAndUpdate(categoryId, updates, { new: true, runValidators: true })

    if (!updateCategory) {
      return response.status(404).json({ error: `Category with id: ${categoryId} not found` })
    }
    response.status(201).json({ message: `Category id: ${categoryId} updated with new data`, newData: updates })
  } catch (error) {
    next(error)
  }
})

module.exports = categoryRouter