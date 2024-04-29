const logger = require("./logger")

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
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
  errorHandler
}