/**
 * errorHandler
 *
 * error handler in case of a server internal error (500)
 * @param {Object} error The error object to return
 */
exports.errorHandler = (error, req, res, next) => res.status(500).json(error)

module.exports = exports
