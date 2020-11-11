import React from 'react';
import styled from 'styled-components';

export const CommentWrapper = styled.div`
  display: flex;
  align-items: top;
  padding: 20px 5px;
`;

export const UserAvater = styled.img`
  margin: 0 5px;
  width: 40px;
  height: 40px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 10px;
  background-color: ${(props) => props.theme.whiteColor};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const ContentHeader = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  color: ${(props) => props.theme.whiteColor};
  background-color: ${(props) => props.theme.blueColor};
  border-radius: ${(props) => props.theme.radiusTop};
`;

const HeaderText = styled.span`
  font-size: 13px;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Content = styled.div`
  min-height: 20px;
  padding: 15px;
  background-color: ${(props) => props.theme.whiteColor};
  font-size: 13px;
`;

const Badge = styled.span`
  position: absolute;
  right: 10px;
  font-size: 13px;
`;

const IssueComment = (props) => {
  const { id, user, content, createdAt, isAuthor } = props;
  return (
    <CommentWrapper>
      <UserAvater src={user.avatar} />
      <ContentWrapper>
        <ContentHeader>
          <HeaderText>
            <Name>{user.username}</Name> commented
          </HeaderText>
          <Badge>{isAuthor ? 'Author' : 'Member'}</Badge>
        </ContentHeader>
        <Content>{content || 'No description provided.'}</Content>
      </ContentWrapper>
    </CommentWrapper>
  );
};

export default IssueComment;
