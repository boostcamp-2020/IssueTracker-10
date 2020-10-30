const errorMessages = {
  user: {
    notFoundError: "Can't find user!",
    invalidUsername: 'This username is already exist!',
  },
  issue: {
    invalid: 'INVALID ERROR : the received data is invalid',
    notFoundError: "Can't find issue!",
    noRequestData: "Can't find request data",
    notAuthor: 'not issue auther',
    compareAuthorFailed: 'Error on comparing issue author',
    createFailed: 'Error on creating an issue',
    updateFailed: 'Error on updating an issue',
    deleteFailed: 'Error on deleting an issue',
    unprocessable: 'UNPROCESSABLE : The request data is unprocessable',
  },
  label: {
    notFoundError: "Can't find label",
  },
  milestone: {
    notFoundError: "Can't find milestone",
  },
  server: 'INTERNAL ERROR : Unexpected error occurred',
  unauthorized: 'AUTH ERROR : The request is not authorized',
};

module.exports = errorMessages;
