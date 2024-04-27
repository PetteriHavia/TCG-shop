const express = require("express")
const app = express()
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")

mongoose.set("strictQuery", false);

mongoose.connect(config.MONGO_URI)
  .then(() => {
    logger.info(`connected to MongoDB`);
  })
  .catch((error) => {
    logger.error("error while connecting to MongoDB", error.message)
  })

module.exports = app