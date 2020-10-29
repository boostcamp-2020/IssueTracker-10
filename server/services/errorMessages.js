const errorMessages = {
  user: {
    notFoundError: "Can't find user!",
    invalidUsername: 'This username is already exist!',
  },
  issue: {
    invalid: 'INVALID ERROR : the received data is invalid',
    notFoundError: "Can't find issue!",
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
