import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import NewIssueInput from './NewIssueInput';
import IssueSideBar from './IssueSideBar';
import { AuthStateContext } from '../Context/AuthContext';
import { IssueDispatchContext } from '../Context/IssueContext';
import { request } from '../Api';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NewIssueWrapper = styled.div`
  display: flex;
  width: 1100px;
  margin: 0 auto;
`;

const NewIssue = () => {
  const state = useContext(AuthStateContext);
  const issueDispatch = useContext(IssueDispatchContext);

  useEffect(async () => {
    if (state.token) {
      const config = { url: '/api/all', method: 'GET', token: state.token };
      const { data } = await request(config);
      if (data) {
        issueDispatch({ type: 'STORE_DETAIL_DATA', payload: data });
      }
    }
  });

  return (
    <Wrapper>
      <Header />
      <NewIssueWrapper>
        <NewIssueInput />
        <IssueSideBar />
      </NewIssueWrapper>
    </Wrapper>
  );
};

export default NewIssue;
