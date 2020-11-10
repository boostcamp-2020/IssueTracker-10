import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FilterInput from './IssueFilter/FilterInput';
import IssueList from './IssueList';
import LabelMilestoneButton from '../Common/LabelMilestoneButton';
import GreenButton from '../Common/GreenButton';
import { request } from '../../Api';
import { AuthStateContext, AuthDispatchContext } from '../../Context/AuthContext';
import { IssueDispatchContext } from '../../Context/IssueContext';

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
    if (data) issueDispatch({ type: 'FETCH_ISSUES', payload: data });
  };

  useEffect(() => {
    if (!state.token) dispatch({ type: 'LOGIN', token });
  }, []);

  useEffect(() => {
    if (state.token) {
      fetchHeader();
      fetchIssues();
    }
    return () => {
      setIssueHeader([]);
    };
  }, [state.token]);

  return (
    <Wrapper>
      <IssueHeader>
        <FilterInput />
        <LabelMilestoneButton issueHeader={issueHeader} hasCount />
        <Link to="/new">
          <GreenButton title="New Issue" />
        </Link>
      </IssueHeader>
      <IssueList issueHeader={issueHeader} />
    </Wrapper>
  );
};

export default Issue;
