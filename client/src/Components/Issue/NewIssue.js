import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import NewIssueInput from './NewIssueInput';
import IssueSideBar from './IssueSideBar';
import { AuthDispatchContext, AuthStateContext } from '../../Context/AuthContext';
import { IssueDispatchContext } from '../../Context/IssueContext';
import { MilestoneDispatchContext } from '../../Context/MilestoneContext';
import IssueInfoProvider from '../Provider/IssueInfo';
import { request } from '../../Api';

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
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const issueDispatch = useContext(IssueDispatchContext);
  const milestonDispatch = useContext(MilestoneDispatchContext);

  useEffect(async () => {
    if (authState.token) {
      const config = { url: '/api/all', method: 'GET', token: authState.token };
      const { data } = await request(config);
      if (data) {
        issueDispatch({ type: 'STORE_DETAIL_DATA', payload: data });
      }
    }
    if (authState.user.id === null) {
      const config = { url: '/auth/user', method: 'GET', token: authState.token };
      const { data } = await request(config);
      if (data) {
        authDispatch({ type: 'SET_USERINFO', data });
      }
    }

    const config = { url: '/api/milestone?state=1', method: 'GET', token: authState.token };
    const { data } = await request(config);
    if (data) {
      milestonDispatch({ type: 'GET_OPEN_MILESTONE', data });
    }
  });

  return (
    <Wrapper>
      <NewIssueWrapper>
        <IssueInfoProvider>
          <NewIssueInput />
          <IssueSideBar />
        </IssueInfoProvider>
      </NewIssueWrapper>
    </Wrapper>
  );
};

export default NewIssue;
