import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthStateContext } from '../../../Context/AuthContext';
import { request } from '../../../Api';
import Header from './IssueDetailHeader';
import IssueComment from './IssueComment';
import CommentInput from './CommentInput';
import IssueSideBar from '../IssueSideBar';
import { IssueInfoContext, IssueInfoDispatchContext } from '../../../Context/IssueInfoContext';

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const DiscussionSection = styled.section`
  display: flex;
`;

const CommentSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const IssueDetail = ({ match }) => {
  const authState = useContext(AuthStateContext);
  const { id } = match.params;
  const issueInfoState = useContext(IssueInfoContext);
  const issueInfoDispatch = useContext(IssueInfoDispatchContext);
  const [commentData, setCommentData] = useState([]);

  const fetchIssueData = async () => {
    const config = { url: `/api/issue/${id}`, method: 'GET', token: authState.token };
    const { data = {} } = await request(config);
    if (data) issueInfoDispatch({ type: 'GET_ISSUE_INFO', data });
  };

  const fetchComments = async () => {
    const config = { url: `/api/issue/${id}/comment`, method: 'GET', token: authState.token };
    const { data = {} } = await request(config);
    if (data) setCommentData(data);
  };

  useEffect(() => {
    fetchIssueData();
    fetchComments();
  }, []);

  return (
    <Wrapper>
      <Header />
      <DiscussionSection>
        <CommentSection>
          {commentData.map((comment) => {
            const isAuthor = issueInfoState.user && issueInfoState.user.id === comment.id;
            return <IssueComment isAuthor={isAuthor} {...comment} />;
          })}
          <CommentInput />
        </CommentSection>
        <IssueSideBar />
      </DiscussionSection>
    </Wrapper>
  );
};

export default IssueDetail;
