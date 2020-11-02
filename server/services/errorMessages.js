const errorMessages = {
  user: {
    notFoundError: 'NOT FOUND : The data is not found',
    invalidUsername: 'This username is already exist!',
  },
  issue: {
    invalid: 'INVALID ERROR : the received data is invalid',
    notFoundError: 'NOT FOUND : The data is not found',
    notAuthor: 'not issue auther',
    compareAuthorFailed: 'Error on comparing issue author',
    createFailed: 'Error on creating an issue',
    updateFailed: 'Error on updating an issue',
    deleteFailed: 'Error on deleting an issue',
    unprocessable: 'UNPROCESSABLE : The request data is unprocessable',
  },
  label: {
    invalid: 'INVALID ERROR : the received data is invalid',
    alreadyExist: 'This label title is already exist!',
    notFoundError: 'NOT FOUND : The data is not found',
  },
  milestone: {
    invalid: 'INVALID ERROR : the received data is invalid',
    notFoundError: 'NOT FOUND : The data is not found',
    createFailed: 'Error on creating an milestone',
    deleteFailed: 'Error on deleting a milestone',
    updateFailed: 'Error on updating a milestone',
  },
  server: 'INTERNAL ERROR : Unexpected error occurred',
  unauthorized: 'AUTH ERROR : The request is not authorized',
};

module.exports = errorMessages;
