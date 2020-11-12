import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthStateContext } from '../../../Context/AuthContext';
import IssueComment from './IssueComment';
import { IssueInfoContext } from '../../../Context/IssueInfoContext';
import IssueInfoProvider from '../../Provider/IssueInfo';

const Wrapper = styled.div``;

const IssueDetail = ({ commentData }) => {
  const authState = useContext(AuthStateContext);
  const issueInfoState = useContext(IssueInfoContext);

  return (
    <IssueInfoProvider>
      <Wrapper>
        {commentData.map((comment) => {
          const isAuthor = issueInfoState.user && issueInfoState.user.id === comment.user.id;
          const isEditer = authState.user.id === comment.user.id;
          return <IssueComment isAuthor={isAuthor} isEditer={isEditer} {...comment} />;
        })}
      </Wrapper>
    </IssueInfoProvider>
  );
};

export default IssueDetail;
