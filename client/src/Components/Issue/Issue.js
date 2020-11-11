import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FilterInput from './IssueFilter/FilterInput';
import IssueList from './IssueList';
import LabelMilestoneButton from '../Common/LabelMilestoneButton';
import GreenButton from '../Common/GreenButton';
import { request } from '../../Api';
import { ClearIcon } from '../static/svgIcons';
import { AuthStateContext, AuthDispatchContext } from '../../Context/AuthContext';
import {
  IssueDispatchContext,
  IssueStateContext,
  initialIssueState,
} from '../../Context/IssueContext';
import { convertFilterParams } from '../../utils/convert';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1100px;
  margin: 0 auto;
`;

const IssueHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px auto;
`;

const ResetFilter = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  color: ${(props) => props.theme.darkgrayColor};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  svg {
    margin-right: 5px;
    fill: ${(props) => props.theme.whiteColor};
    background-color: ${(props) => props.theme.darkgrayColor};
    border-radius: ${(props) => props.theme.radiusSmall};
  }
  &:hover {
    color: ${(props) => props.theme.blueColor};
    svg {
      background-color: ${(props) => props.theme.blueColor};
    }
  }
`;

const Issue = ({ token }) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const issueState = useContext(IssueStateContext);
  const issueDispatch = useContext(IssueDispatchContext);
  const [issueHeader, setIssueHeader] = useState({});

  const fetchHeader = async () => {
    const config = {
      url: '/api/all',
      method: 'GET',
      token: authState.token,
    };
    const { data } = await request(config);
    if (data) setIssueHeader(data);
  };

  const fetchIssues = async () => {
    const config = {
      url: '/api/issue',
      method: 'GET',
      token: authState.token,
      params: convertFilterParams(issueState.filter),
    };
    const { data } = await request(config);
    if (data) issueDispatch({ type: 'FETCH_ISSUES', payload: data });
  };

  const isNonFilter = (currentFilter) => {
    const { filter } = initialIssueState;
    return Object.keys(filter).every((key) => filter[key] === currentFilter[key]);
  };

  useEffect(() => {
    if (!authState.token) authDispatch({ type: 'LOGIN', token });
  }, []);

  useEffect(() => {
    if (authState.token) {
      fetchHeader();
      fetchIssues();
    }
    return () => setIssueHeader([]);
  }, [authState.token]);

  useEffect(() => {
    if (authState.token) fetchIssues();
  }, [issueState.filter]);

  return (
    <Wrapper>
      <IssueHeader>
        <FilterInput />
        <LabelMilestoneButton issueHeader={issueHeader} hasCount />
        <Link to="/new">
          <GreenButton title="New Issue" />
        </Link>
      </IssueHeader>
      {!isNonFilter(issueState.filter) && (
        <ResetFilter onClick={() => issueDispatch({ type: 'RESET_FILTER' })}>
          <ClearIcon />
          Clear current search query, filters, and sorts
        </ResetFilter>
      )}

      <IssueList issueHeader={issueHeader} />
    </Wrapper>
  );
};

export default Issue;
