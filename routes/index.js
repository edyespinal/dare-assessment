const express = require('express')
const router = express.Router()
const api = require('../api')
const { setToken } = require('../helpers')

/** Initial route (for testing purposes only) */
router.get('/', (req, res) => {
  res.send(`
    <form action="/login" method="post">
      <button type="submit">Login</button>
    </form>
  `)
})

/** Set token to be used in routes */
router.use(setToken)

/** POST - Auth */
router.post('/login', api.getAuthorization, (req, res) => {
  res.send(req.accessToken)
})

/** GET - Policies */
router.get('/policies', api.getPolicies, (req, res) => {
  try {
    const { policies } = res.policies
    res.json(policies)
  } catch (err) {
    res.json({ code: 500, message: 'Something went wrong' })
  }
})

/** GET Policies details */
router.get('/policies/:id', api.policiesClientDetails, (req, res) => {
  const { clientDetails } = res
  res.json(clientDetails)
})

/** GET - Clients */
router.get('/clients', api.getClients, (req, res, next) => {
  try {
    const { clients } = res.clients
    return res.json(clients)
  } catch (err) {
    return next()
  }
})

/** Get Clients details */
router.get('/clients/:id', api.getClientsDetails, (req, res, next) => {
  try {
    const { clientDetails } = res
    return res.json(clientDetails)
  } catch (err) {
    return next()
  }
})

/**  GET */
router.get('/clients/:id/policies', api.getClientsPolicies, (req, res, next) => {
  try {
    const { clientPolicies } = res
    return res.json(clientPolicies)
  } catch (err) {
    return next()
  }
})

module.exports = router
