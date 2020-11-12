import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthStateContext } from '../../../Context/AuthContext';
import { request } from '../../../Api';
import Header from './IssueDetailHeader';
import IssueComment from './IssueComment';
import CommentInput from './CommentInput';

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
  flex: 1;
`;

const SidebarSection = styled.section`
  flex: 0.4;
`;

const IssueDetail = ({ match }) => {
  const authState = useContext(AuthStateContext);
  const { id } = match.params;
  const [issueData, setIssueData] = useState({});
  const [commentData, setCommentData] = useState([]);

  const fetchIssueData = async () => {
    const config = { url: `/api/issue/${id}`, method: 'GET', token: authState.token };
    const { data = {} } = await request(config);
    if (data) setIssueData(data);
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
      <Header {...issueData} />
      <DiscussionSection>
        <CommentSection>
          {commentData.map((comment) => {
            const isAuthor = issueData.user && issueData.user.id === comment.id;
            return <IssueComment isAuthor={isAuthor} {...comment} />;
          })}
          <CommentInput {...issueData} />
        </CommentSection>
        <SidebarSection />
      </DiscussionSection>
    </Wrapper>
  );
};

export default IssueDetail;
