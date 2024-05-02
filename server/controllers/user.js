const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")


userRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body
  try {
    if (username === undefined || password === undefined) {
      return response.status(400).json({ error: "username or password is not defined" })
    }
    if (username.length < 2 || password.length < 5) {
      return response.status(400).json({ error: "username and password needs to be longer" })
    }
    const userExistsAlready = await User.findOne({ username: username })
    if (userExistsAlready) {
      return response.status(400).json({ error: "This username already exists" })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash,
    })

    const savedUser = await user.save()
    response.status(500).json(savedUser)
  } catch (error) {
    next(error)
  }

})


module.exports = userRouter