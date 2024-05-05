const mongoose = require("mongoose")
const Category = require("./category")

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
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
  slug: {
    type: String,
  },
  amount: {
    type: Number,
  },
  rarity: {
    type: String,
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
    validate: {
      validator: function (value) {
        return typeof value === 'number' || typeof value === 'object';
      },
      message: props => `${props.value} is not a valid type for 'price' field. It should be a number or object`
    }
  },
}, { collection: "products" });

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Product', productSchema)