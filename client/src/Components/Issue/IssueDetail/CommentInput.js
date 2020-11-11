import React from 'react';
import styled from 'styled-components';
import { CreateButton as Button } from './IssueDetailHeader';
import { ContentWrapper, CommentWrapper, UserAvater } from './IssueComment';

const InputHeader = styled.div`
  height: 23px;
  box-sizing: content-box;
  padding: 20px 0 0 15px;
  background-color: ${(props) => props.theme.blueColor};
  border-radius: ${(props) => props.theme.radiusTop};
`;

const WriteTab = styled.span`
  padding: 6px 10px;
  background-color: ${(props) => props.theme.whiteColor};
  border-radius: 2px 2px 0 0;
  font-size: 13px;
`;

const Input = styled.textarea`
  height: 100px;
  margin: 10px;
  padding: 10px;
  border: ${(props) => props.theme.border};
  line-height: 1.5;
  resize: vertical;
  &::placeholder {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.span`
  margin-left: auto;
  padding: 10px 10px;
`;

const StateButton = styled(Button)`
  background-color: ${(props) => props.theme.redColor};
`;

const CommentInput = (props) => {
  const { user } = props;

  return (
    <CommentWrapper>
      <UserAvater src={user && user.avatar} />
      <ContentWrapper>
        <InputHeader>
          <WriteTab>Write</WriteTab>
        </InputHeader>
        <Input placeholder="Leave a comment" />
        <ButtonWrapper>
          <StateButton>Close Issue</StateButton>
          <Button>Comment</Button>
        </ButtonWrapper>
      </ContentWrapper>
    </CommentWrapper>
  );
};

export default CommentInput;
