import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Header from './Header';
import FilterInput from './FilterInput';
import IssueList from './IssueList';
import LabelMilestoneButton from './LabelMilestoneButton';
import GreenButton from './GreenButton';
import { request } from '../Api';
import { AuthStateContext, AuthDispatchContext } from '../Context/AuthContext';
import { IssueDispatchContext } from '../Context/IssueContext';
import IssueProvider from './Provider/Issue';

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
  const issueDispatch = useContext(IssueDispatchContext);
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
        if (data) {
          setIssueHeader(data);
          issueDispatch({ type: 'FETCH_HEADER', payload: data });
        }
      };
      const fetchIssues = async () => {
        const config = { url: '/api/issue', method: 'GET', token: state.token };
        const { data } = await request(config);
        if (data) {
          setIssues(data);
          issueDispatch({ type: 'FETCH_ISSUES', payload: data });
        }
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
        <GreenButton title="New Issue" />
      </IssueHeader>
      <IssueList issues={issues} issueHeader={issueHeader} />
    </Wrapper>
  );
};

export default Issue;
