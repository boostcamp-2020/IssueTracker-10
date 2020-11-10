import React from 'react';

const IssueDetail = ({ match }) => {
  const { id } = match.params;
  return (
    <>
      <div>{id}</div>
    </>
  );
};

export default IssueDetail;
