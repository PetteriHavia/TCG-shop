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
  description: [
    {
      type: String
    }
  ],
  image: {
    type: String,
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
  },
  amount: Number,
}, { collection: "products", discriminatorKey: 'productType' }); // discriminatorKey is used to define the field that determines the schema type

/*
const singleCardProductSchema = new mongoose.Schema({
  rarity: {
    type: String,
  },
  priceVariants: [
    {
      price: Number,
      condition: String,
      amount: Number
    }
  ]
});

const normalProductSchema = new mongoose.Schema({
  price: Number,
  amount: Number
});

const Product = mongoose.model('Product', productSchema);
const SingleCardProduct = Product.discriminator('SingleCard', singleCardProductSchema);
const NormalProduct = Product.discriminator('Normal', normalProductSchema)*/

productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

productSchema.pre('validate', async function (next) {
  try {
    const category = await this.model('Category').findById(this.category);
    if (category.name === 'single-card') {
      this.price = [{
        price: Number,
        condition: String,
        amount: Number,
      }];
    } else {
      this.price = Number
    }
    next();
  } catch (error) {
    next(error)
  }
})


module.exports = mongoose.model('Product', productSchema)