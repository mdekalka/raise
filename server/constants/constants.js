const USER_ROLES = {
  ADMIN: 'ADMIN',
  COLLABORATOR: 'COLLABORATOR',
  USER: 'USER'
};
const EXPIRATION_TIME = Date.now() + 3600000
const MONGO_ERROR_NAME = 'MongoError';
const MONGO_ERRORS = {
  duplicate: 11000
}
const RESPONSE_ERRORS = {
  inaccessible_database: {
    error: 'The operation can\'t be processed.',
    errorCode: 'inaccessible_database'
  },
}

module.exports = {
  USER_ROLES,
  EXPIRATION_TIME,
  MONGO_ERROR_NAME,
  MONGO_ERRORS,
  RESPONSE_ERRORS
};
