import React, { useContext } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { ContentWrapper, CommentWrapper, UserAvater } from './IssueComment';
import { AuthStateContext, AuthDispatchContext } from '../../../Context/AuthContext';
import { IssueInfoContext, IssueInfoDispatchContext } from '../../../Context/IssueInfoContext';
import InputComment from '../InputComment';
import { request } from '../../../Api';

const issueState = {
  open: 1,
  closed: 0,
};

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

const ChangeStateButton = styled(Button)`
  background-color: ${(props) => props.theme.redColor};
`;

const CommentInput = () => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const { user } = useContext(AuthStateContext);
  const { id, content, state } = useContext(IssueInfoContext);
  const issueInfoDispatch = useContext(IssueInfoDispatchContext);

  const fetchComments = async () => {
    const config = { url: `/api/issue/${id}/comment`, method: 'GET', token: authState.token };
    const { status, data = {} } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
    if (data) issueInfoDispatch({ type: 'SET_COMMENTS', data });
  };

  const onClickPostComment = async () => {
    const data = { content };
    const config = {
      url: `/api/issue/${id}/comment`,
      method: 'POST',
      token: authState.token,
      data,
    };
    const { status } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
    if (status === 200) {
      issueInfoDispatch({ type: 'SET_CONTENT', data: '' });
      fetchComments();
    }
  };

  const onClickChangeIssueState = async () => {
    const newState = state ? issueState.closed : issueState.open;
    const data = { state: newState, issueIds: [id] };
    const config = {
      url: `/api/issue/state`,
      method: 'PUT',
      token: authState.token,
      data,
    };
    const { status } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
    if (status === 200) issueInfoDispatch({ type: 'SET_STATE', data });
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
          <ChangeStateButton
            text={state ? 'Close issue' : 'Reopen issue'}
            onClick={onClickChangeIssueState}
          />
          <Button disabled={!content} onClick={onClickPostComment} text="Comment" />
        </ButtonWrapper>
      </ContentWrapper>
    </CommentWrapper>
  );
};

export default CommentInput;
