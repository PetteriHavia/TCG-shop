const express = require("express")
const app = express()
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")
const categoryRouter = require("./controllers/category")
const productRouter = require("./controllers/product")
const userRouter = require("./controllers/user")
const middleware = require("./utils/middleware")
const loginRouter = require("./controllers/login")

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info(`connected to MongoDB`);
  })
  .catch((error) => {
    logger.error("error while connecting to MongoDB", error.message)
  })

app.use(express.json());
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter)
app.use(middleware.errorHandler);

module.exports = app;