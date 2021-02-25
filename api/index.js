const { getToken } = require('../routes/oauth')
const { paginate, insuranceApiRequest } = require('../helpers')

// AUTH (POST)
exports.getAuthorization = async (req, res, next) => {
  try {
    // get token
    const token = await getToken()

    // if authorized, set token to request object
    if (token.status !== 401) {
      req.accessToken = token
      return next()
    }
    return next({ code: 401, message: 'Unauthorized' })
  } catch (err) {
    return next({ code: 500, message: 'Something went wrong' })
  }
}

// POLICIES (GET)
exports.getPolicies = async (req, res, next) => {
  try {
    // request policies from API
    const requestPolicies = await insuranceApiRequest(req.token.access_token, 'policies')

    // paginate the results from the request
    const policies = paginate(requestPolicies.data, req.query.page, req.query.limit)

    // add the policies to response
    res.policies = { code: 200, policies }

    return next()
  } catch (err) {
    return next({ code: 500, message: 'Something went wrong' })
  }
}

// POLICIES:ID (GET)
exports.policiesClientDetails = async (req, res, next) => {
  try {
    // request policies from API
    const requestPolicies = await insuranceApiRequest(req.token.access_token, 'policies')

    // get policies' client details
    const { id } = req.params
    const clientDetails = requestPolicies.data.filter((policy) => policy.clientId === id)

    // add clientDetails to response
    res.clientDetails = { code: 200, clientDetails }
    return next()
  } catch (err) {
    return next({ code: 500, message: 'Something went wrong' })
  }
}

// CLIENTS (GET)
exports.getClients = async (req, res, next) => {
  try {
    // request clients from API
    const requestClients = await insuranceApiRequest(req.token.access_token, 'clients')

    // paginate results (page 1 and limit 10 by default)
    const clients = paginate(requestClients.data, req.query.page, req.query.limit)

    // add clients to response
    res.clients = { code: 200, clients }
    return next()
  } catch (err) {
    return next({ code: 500, message: 'Something went wrong' })
  }
}

// CLIENTS/:ID (GET)
exports.getClientsDetails = async (req, res, next) => {
  try {
    // request client from API
    const requestClients = await insuranceApiRequest(req.token.access_token, 'clients')

    // get client details
    const { id } = req.params
    const clientDetails = requestClients.data.filter((client) => client.id === id)[0]

    // add clientDetails to response
    res.clientDetails = clientDetails

    return next()
  } catch (err) {
    return next({ code: 500, message: 'Something went wrong' })
  }
}

// CLIENTS/:ID/POLICIES (GET)
exports.getClientsPolicies = async (req, res, next) => {
  try {
    // request client from API
    const requestClients = await insuranceApiRequest(req.token.access_token, 'clients')

    // get client
    const { id } = req.params
    const clientDetails = requestClients.data.filter((client) => client.id === id)[0]

    // request policies from API
    const requestPolicies = await insuranceApiRequest(req.token.access_token, 'policies')

    // get client policies
    const clientPolicies = requestPolicies.data.filter((policy) => policy.clientId === clientDetails.id)

    // add client' policies to response
    res.clientPolicies = clientPolicies

    return next()
  } catch (err) {
    return next({ code: 500, message: 'Something went wrong' })
  }
}

module.exports = exports
