import React, { useContext } from 'react';
import styled from 'styled-components';
import { CreateButton as Button } from './IssueDetailHeader';
import { ContentWrapper, CommentWrapper, UserAvater } from './IssueComment';
import { AuthStateContext } from '../../../Context/AuthContext';
import { IssueInfoContext } from '../../../Context/IssueInfoContext';
import InputComment from '../InputComment';
import { request } from '../../../Api';

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

const InputCommentWrapper = styled.div`
  margin: 0 10px;
`;

const ButtonWrapper = styled.span`
  margin-left: auto;
  padding: 10px 10px;
`;

const StateButton = styled(Button)`
  background-color: ${(props) => props.theme.redColor};
`;

const CommentInput = () => {
  const authState = useContext(AuthStateContext);
  const { user } = useContext(AuthStateContext);
  const { id, content } = useContext(IssueInfoContext);

  const onClickPostComment = async () => {
    const data = { content };
    const config = {
      url: `/api/issue/${id}/comment`,
      method: 'POST',
      token: authState.token,
      data,
    };
    const result = await request(config);
    if (result) alert('커멘트 추가 성공');
  };

  return (
    <CommentWrapper>
      <UserAvater src={user && user.avatar} />
      <ContentWrapper>
        <InputHeader>
          <WriteTab>Write</WriteTab>
        </InputHeader>
        <InputCommentWrapper>
          <InputComment rows={5} />
        </InputCommentWrapper>
        <ButtonWrapper>
          <StateButton>Close Issue</StateButton>
          <Button disabled={!content} onClick={onClickPostComment}>
            Comment
          </Button>
        </ButtonWrapper>
      </ContentWrapper>
    </CommentWrapper>
  );
};

export default CommentInput;
