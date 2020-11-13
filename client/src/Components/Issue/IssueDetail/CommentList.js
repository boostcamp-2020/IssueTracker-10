import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthStateContext } from '../../../Context/AuthContext';
import IssueComment from './IssueComment';
import { IssueInfoContext } from '../../../Context/IssueInfoContext';
import IssueInfoProvider from '../../Provider/IssueInfo';

const Wrapper = styled.div``;

const IssueDetail = () => {
  const authState = useContext(AuthStateContext);
  const { user, comments } = useContext(IssueInfoContext);

  return (
    <IssueInfoProvider>
      <Wrapper>
        {comments.map((comment) => {
          const isAuthor = user && user.id === comment.user.id;
          const isEditer = authState.user.id === comment.user.id;
          return (
            <IssueComment key={comment.id} isAuthor={isAuthor} isEditer={isEditer} {...comment} />
          );
        })}
      </Wrapper>
    </IssueInfoProvider>
  );
};

export default IssueDetail;
