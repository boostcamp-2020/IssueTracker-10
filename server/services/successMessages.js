const successMessages = {
  user: {
    read: 'Success to find user!',
  },
  issue: {
    create: 'SUCCESS : The issue data is successfully created',
    read: 'Success to find issue!',
    update: 'SUCCESS : The issue data is successfully updated',
    delete: 'Success to delete issue!',
  },
  label: {
    read: 'Success to find label!',
    create: 'SUCCESS : The label data is successfully created',
    delete: 'SUCCESS : The label data is successfully deleted',
  },
  milestone: {
    create: 'SUCCESS : The milestone is successfully created',
    read: 'SUCCESS : The request is successfully processed',
    update: 'SUCCESS : The milestone data is successfully updated',
    delete: 'Success to delete milestone!',
  },
  comment: {
    read: 'SUCCESS : The request is successfully processed',
    create: 'SUCCESS : The comment is successfully created',
  },
};

module.exports = successMessages;
