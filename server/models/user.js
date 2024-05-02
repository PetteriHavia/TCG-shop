const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
}, { collection: "users" })

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model("User", userSchema)