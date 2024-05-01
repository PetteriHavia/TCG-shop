const categoryRouter = require("express").Router()
const Category = require("../models/category")
const { checkExistingDuplicate } = require("../utils/checkExistingDuplicate")


categoryRouter.get("/:id", async (request, response, next) => {
  const categoryId = request.params.id
  try {
    const category = await Category.findById(categoryId)
    if (!category) {
      return response.status(404).json({ error: "No category found" })
    }
    response.status(201).json(category)
  } catch (error) {
    next(error)
  }
})

categoryRouter.get("/", async (request, response, error) => {
  try {
    const categories = await Category.find({})
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
    })

    const SavedCategory = await newCategory.save()
    response.status(201).json({ message: `new category added`, data: SavedCategory.name })
  } catch (error) {
    next(error)
  }
})

module.exports = categoryRouter