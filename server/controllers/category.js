const categoryRouter = require("express").Router()
const category = require("../models/category")
const Category = require("../models/category")
const Product = require("../models/product")
const { checkExistingDuplicate } = require("../utils/checkExistingDuplicate")
const mongoose = require("mongoose")


categoryRouter.get('/Single-card/:setName', async (request, response, next) => {
  const { setName } = request.params
  const { availability, rarity } = request.query;

  try {
    const singleCardCategory = await Category.findOne({ name: "Single card" })

    if (!singleCardCategory) {
      return response.status(404).json({ error: "Single card category not found" })
    }

    let filterCriteria = [{ categories: singleCardCategory._id }, { setName }]

    if (availability === "true") {
      filterCriteria.push({
        $or: [
          { 'price.amount': { $gt: 0 } },
          { 'amount': { $gt: 0 } }
        ]
      });
    }

    if (rarity) {
      const raritiesArray = rarity.split(',');
      filterCriteria.push({ rarity: { $in: raritiesArray } });
    }

    const query = { $and: filterCriteria };

    const products = await Product.find(query);

    response.status(200).json(products);

  } catch (error) {
    next(error)
  }
})


categoryRouter.get('/:category/filter', async (request, response, next) => {
  try {
    const { category } = request.params;
    const { availability, type, rarity, setName } = request.query;

    let filterCriteria = [];

    console.log(category)

    // Handle category filtering
    if (category && category !== 'all') {
      const categoryDoc = await Category.findOne({ name: category });
      if (categoryDoc) {
        filterCriteria.push({ categories: categoryDoc._id });
      } else {
        return response.status(404).json({ message: 'Category not found' });
      }
    }

    if (availability === "true") {
      filterCriteria.push({
        $or: [
          { 'price.amount': { $gt: 0 } },
          { 'amount': { $gt: 0 } }
        ]
      });
    }

    // Handle type filtering
    if (type) {
      const typesArray = type.split(',');
      const typeCategoryDocs = await Category.find({ name: { $in: typesArray } });
      const typeCategoryIds = typeCategoryDocs.map(cat => cat._id);

      filterCriteria.push({ categories: { $in: typeCategoryIds } });
    }

    // Handle rarity filtering
    if (rarity) {
      const raritiesArray = rarity.split(',');
      filterCriteria.push({ rarity: { $in: raritiesArray } });
    }

    //Handle setName filtering
    if (setName) {
      filterCriteria.push({ setName });
    }

    let query = {};
    if (filterCriteria.length > 0) {
      query = { $and: filterCriteria }
    }

    // Fetch the filtered products
    const products = await Product.find(query);

    response.status(200).json(products);
  } catch (error) {
    next(error)
  }
});

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