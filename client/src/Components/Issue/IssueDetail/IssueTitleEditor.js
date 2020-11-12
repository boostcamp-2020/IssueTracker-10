import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IssueInfoDispatchContext } from '@Context/IssueInfoContext';
import { AuthStateContext, AuthDispatchContext } from '@Context/AuthContext';
import { request } from '../../../Api';

const EditorWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TitleInput = styled.input`
  width: 85%;
  margin-right: auto;
  padding: 7px 10px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  font-size: 15px;
  &:focus {
    border: ${(props) => props.theme.borderFocus};
    box-shadow: ${(props) => props.theme.focusShadow};
  }
`;

const CancelButton = styled.button`
  margin: 0 7px;
  color: ${(props) => props.theme.blueColor};
  background: transparent;
`;

const SaveButton = styled.button`
  margin-left: 10px;
  padding: 7px 12px;
  color: ${({ theme }) => theme.blackColor};
  background-color: ${({ theme }) => theme.whiteColor};
  border: ${({ theme }) => theme.border};
  font-size: 13px;
`;

const IssueTitleEditor = (props) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const infoDispatch = useContext(IssueInfoDispatchContext);
  const { id, title = '', setIsEdit } = props;
  const [editTitle, setEditTitle] = useState(title);

  const putTitle = async () => {
    const writtenTitle = editTitle;
    const config = {
      url: `/api/issue/${id}`,
      token: authState.token,
      method: 'put',
      data: { title: writtenTitle },
    };
    const { status } = await request(config);
    if (status === 401) authDispatch({ type: 'LOGOUT' });
    if (status === 200) {
      infoDispatch({ type: 'SET_TITLE', data: writtenTitle });
      setIsEdit(false);
    }
  };

  const onChangeTitle = ({ target }) => setEditTitle(target.value);
  const onClickCancel = () => setIsEdit(false);
  const onClickSave = () => putTitle();

  return (
    <EditorWrapper>
      <TitleInput value={editTitle} onChange={onChangeTitle} />
      <SaveButton onClick={onClickSave}>Save</SaveButton>
      <CancelButton onClick={onClickCancel}>Cancel</CancelButton>
    </EditorWrapper>
  );
};

export default IssueTitleEditor;
