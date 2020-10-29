const errorMessages = {
  user: {
    notFoundError: "Can't find user!",
    invalidUsername: 'This username is already exist!',
  },
  issue: {
    notFoundError: "Can't find issue!",
    noRequestData: 'Can\'t find request data',
    notAuthor: 'not issue auther',
    compareAuthorFailed: 'Error on comparing issue author',
    updateFailed: 'Error on updating an issue',
  },
  label: {
    notFoundError: "Can't find label",
  },
  milestone: {
    notFoundError: "Can't find milestone",
  },
};

module.exports = errorMessages;
