import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Header from './Header';
import FilterInput from './FilterInput';
import IssueList from './IssueList';
import LabelMilestoneButton from './LabelMilestoneButton';
import GreenButton from './GreenButton';
import { request } from '../Api';
import { AuthStateContext } from '../Context/AuthContext';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin: 30px auto;
`;

const Issue = () => {
  const { token } = useContext(AuthStateContext);
  const [issueHeader, setIssueHeader] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchHeader = async () => {
      const config = { url: '/api/all', method: 'GET', token };
      const { data } = await request(config);
      setIssueHeader(data);
    };
    const fetchIssues = async () => {
      const config = { url: '/api/issue', method: 'GET', token };
      const { data } = await request(config);
      setIssues(data);
    };

    fetchHeader();
    fetchIssues();
  }, []);

  return (
    <Wrapper>
      <Header />
      <IssueHeader>
        <FilterInput />
        <LabelMilestoneButton issueHeader={issueHeader} hasCount />
        <GreenButton title="New Issue" />
      </IssueHeader>
      <IssueList issues={issues} issueHeader={issueHeader} />
    </Wrapper>
  );
};

export default Issue;
