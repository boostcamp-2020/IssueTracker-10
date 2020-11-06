const ERROR_MSG = {
  user: {},
  issue: {
    notAuthor: 'not issue author',
    compareAuthorFailed: 'Error on comparing issue author',
  },
  label: {},
  milestone: {},
  comment: {},
  create: 'CREATE ERROR',
  read: 'READ ERROR',
  update: 'UPDATE ERROR',
  delete: 'DELETE ERROR',
  invalid: 'INVALID ERROR : the received data is invalid',
  server: 'INTERNAL ERROR : Unexpected error occurred',
  unauthorized: 'AUTH ERROR : The request is not authorized',
  notFound: 'NOT FOUND : The data is not found',
  unprocessable: 'UNPROCESSABLE : The request data is unprocessable',
  already: 'CREATE ERROR : The data is already registered',
};

module.exports = ERROR_MSG;
