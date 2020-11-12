import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import InputComment from '../InputComment';
import { request } from '../../../Api';
import { AuthStateContext, AuthDispatchContext } from '../../../Context/AuthContext';
import { IssueInfoContext } from '../../../Context/IssueInfoContext';

const Wrapper = styled.div`
  width: 100%;
  padding: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 10px;
  color: ${(props) => props.theme.redColor};
  background: none;
  border: ${(props) => props.theme.border};
  font-weight: 700;
`;

const UpdateButton = styled(CancelButton)`
  margin-left: 5px;
  background-color: ${(props) => props.theme.greenColor};
  border: ${(props) => props.theme.border};
  color: ${(props) => props.theme.whiteColor};
`;

const CommentEditer = ({ commentId, setEdit, setComment }) => {
  const { content } = useContext(IssueInfoContext);
  const { token } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);

  const onClickCancel = () => {
    setEdit(false);
  };
  const onClickUpdateComment = async () => {
    const data = { content };
    const config = { url: `/api/comment/${commentId}`, method: 'PUT', data, token };
    const { status } = await request(config);
    if (status === 401) return authDispatch({ type: 'LOGOUT' });
    setEdit(false);
    setComment(content);
  };

  return (
    <Wrapper>
      <InputComment rows={5} />
      <ButtonWrapper>
        <CancelButton onClick={onClickCancel}>Cancel</CancelButton>
        <UpdateButton onClick={onClickUpdateComment}>Update comment</UpdateButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CommentEditer;
