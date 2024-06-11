const categoryRouter = require("express").Router()
const Category = require("../models/category")
const { checkExistingDuplicate } = require("../utils/checkExistingDuplicate")
const mongoose = require("mongoose")


categoryRouter.get("/:identifier", async (request, response, next) => {
  const identifier = request.params.identifier;
  console.log(identifier)
  try {
    let category;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      category = await Category.findById(identifier)
    } else {
      category = await Category.findOne({ name: { $regex: new RegExp(`^${identifier}$`, 'i') } })
        .populate("products", { productName: 1, price: 1, status: 1, id: 1, discount: 1, setName: 1, img: 1 })
    }
    if (!category) {
      return response.status(404).json({ error: "No category found" })
    }
    response.status(201).json(category)
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