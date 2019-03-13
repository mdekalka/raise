const { RESPONSE_ERRORS } = require('../constants/constants')

const sendResponse = (res, status = 500, response = RESPONSE_ERRORS.inaccessible_database) => {
  if (!res) {
    throw new Error('Responseobject is requires')
  }

  return res.status(status).json(response)
}

module.exports = {
  sendResponse
}
