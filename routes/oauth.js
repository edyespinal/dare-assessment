const axios = require('axios')
const { credentials } = require('../authconfig')
const cache = {}

/**
 * getToken
 *
 * @param {Number} expiresIn number of seconds for the token to be valid (before it expires).
 * @description The api does not return an expires_in property. Pass one to the getToken function
 */
async function getToken(expiresIn = 60) {
  try {
    // check if there's a token in the cache
    if (cache.token) return cache.token

    /** Get token from API */
    const { clientId, clientSecret } = credentials

    // make request to API
    const apiResponse = await axios({
      method: 'post',
      url: 'https://dare-nodejs-assessment.herokuapp.com/api/login',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      data: { client_id: clientId, client_secret: clientSecret },
    })

    const token = {
      access_token: apiResponse.data.token,
      token_type: apiResponse.data.type,
      expires_in: expiresIn * 1000,
    }

    // store token in cache and stage for deletion
    cache.token = token
    setTimeout(() => {
      delete cache.token
    }, expiresIn * 1000)

    // return token object
    return token
  } catch (err) {
    return { status: 401, message: 'Unauthorized' }
  }
}

module.exports = { getToken }
