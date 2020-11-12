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

const NewIssue = ({ history }) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const issueDispatch = useContext(IssueDispatchContext);
  const milestoneDispatch = useContext(MilestoneDispatchContext);

  useEffect(async () => {
    if (authState.token) {
      const config = { url: '/api/all', method: 'GET', token: authState.token };
      const result = await request(config);
      if (result.status === 401) return authDispatch({ type: 'LOGOUT' });
      if (result.data) {
        issueDispatch({ type: 'STORE_DETAIL_DATA', payload: result.data });
      }
    }
    if (authState.user.id === null) {
      const config = { url: '/auth/user', method: 'GET', token: authState.token };
      const result = await request(config);
      if (result.status === 401) return authDispatch({ type: 'LOGOUT' });
      if (result.data) {
        authDispatch({ type: 'SET_USERINFO', data: result.data });
      }
    }

    const params = { state: 1 };
    const config = { url: '/api/milestone', method: 'GET', token: authState.token, params };
    const result = await request(config);
    if (result.status === 401) return authDispatch({ type: 'LOGOUT' });
    if (result.data) {
      milestoneDispatch({ type: 'GET_OPEN_MILESTONE', data: result.data });
    }
    return null;
  });

  return (
    <Wrapper>
      <NewIssueWrapper>
        <IssueInfoProvider>
          <NewIssueInput history={history} />
          <IssueSideBar />
        </IssueInfoProvider>
      </NewIssueWrapper>
    </Wrapper>
  );
};

export default NewIssue;
