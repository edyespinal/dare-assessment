const axios = require('axios')
const { getToken } = require('../routes/oauth')

/** Set authorization token to request object */
exports.setToken = async (req, res, next) => {
  try {
    const token = await getToken()
    req.token = token
    next()
  } catch (err) {
    res.status(500).json('Something went wrong')
  }
}

/** make a request to the insurance API */
exports.insuranceApiRequest = async (token, endpoint) => {
  const request = await axios({
    method: 'get',
    headers: { accept: 'application/json', authorization: `Bearer ${token}` },
    url: `https://dare-nodejs-assessment.herokuapp.com/api/${endpoint}`,
  })
  return request.data
}

/** paginate results */
exports.paginate = (model, _page, _limit) => {
  // set page and limit
  const page = parseInt(_page, 10) || 1
  const limit = parseInt(_limit, 10) || 10
  // calculate start and end index for pagination
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  // build pagination result object
  const result = {}
  if (endIndex < model.length) result.next = { page: page + 1, limit }
  if (startIndex > 0) result.previous = { page: page - 1, limit }

  // add paginated results to result object
  result.results = model.slice(startIndex, endIndex)

  return result
}

module.exports = exports
