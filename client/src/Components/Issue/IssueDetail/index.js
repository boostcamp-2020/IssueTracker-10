import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthStateContext } from '../../../Context/AuthContext';
import { request } from '../../../Api';
import Header from './IssueDetailHeader';

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const IssueDetail = ({ match }) => {
  const authState = useContext(AuthStateContext);
  const { id } = match.params;
  const [issueData, setIssueData] = useState({});

  const fetchIssueData = async () => {
    const config = { url: `/api/issue/${id}`, method: 'GET', token: authState.token };
    const { data = {} } = await request(config);
    if (data) setIssueData(data);
  };

  useEffect(() => {
    fetchIssueData();
  }, []);

  return (
    <Wrapper>
      <Header {...issueData} />
    </Wrapper>
  );
};

export default IssueDetail;
