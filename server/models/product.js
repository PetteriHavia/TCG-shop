const mongoose = require("mongoose")
const Category = require("./category")

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  discount: {
    type: Number,
  },
  status: {
    type: String
  },
  description: {
    type: Array
  },
  image: {
    type: String,
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
  },
  amount: Number,
}, { collection: "products" });


productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema)