const logger = require("./logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', "")
  }
  next()
}

const userExtractor = async (request, response, next) => {
  try {
    if (request.token) {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!decodedToken || !decodedToken.id) {
        return response.status(401).json({ error: "Invalid token" })
      }
      const user = await User.findById(decodedToken.id)
      if (!user) {
        return response.status(401).json({ error: "User not found" })
      }
      request.user = user
    }
    next()
  } catch (error) {
    next(error)
  }
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    const fieldName = Object.keys(error.keyPattern)[0];
    return response.status(400).json({ error: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} already exists` });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'Token missing or invalid' });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(400).json({ error: 'Token expired' });
  }

  if (error instanceof Error) {
    return response.status(500).json({ error: "Internal server error" })
  }
  next(error)
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}