import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from './Header';
import FilterInput from './FilterInput';
import IssueList from './IssueList';
import LabelMilestoneButton from './LabelMilestoneButton';
import GreenButton from './GreenButton';
import { request } from '../Api';
import { AuthStateContext, AuthDispatchContext } from '../Context/AuthContext';

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

const Issue = ({ token }) => {
  const state = useContext(AuthStateContext);
  const dispatch = useContext(AuthDispatchContext);
  const [issueHeader, setIssueHeader] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    if (!state.token) dispatch({ type: 'LOGIN', token });
  }, []);

  useEffect(() => {
    if (state.token) {
      const fetchHeader = async () => {
        const config = { url: '/api/all', method: 'GET', token: state.token };
        const { data } = await request(config);
        if (data) setIssueHeader(data);
      };
      const fetchIssues = async () => {
        const config = { url: '/api/issue', method: 'GET', token: state.token };
        const { data } = await request(config);
        if (data) setIssues(data);
      };
      fetchHeader();
      fetchIssues();
    }
    return () => {
      setIssueHeader([]);
      setIssues([]);
    };
  }, [state.token]);

  return (
    <Wrapper>
      <Header />
      <IssueHeader>
        <FilterInput />
        <LabelMilestoneButton issueHeader={issueHeader} hasCount />
        <Link to="/new">
          <GreenButton title="New Issue" />
        </Link>
      </IssueHeader>
      <IssueList issues={issues} issueHeader={issueHeader} />
    </Wrapper>
  );
};

export default Issue;
