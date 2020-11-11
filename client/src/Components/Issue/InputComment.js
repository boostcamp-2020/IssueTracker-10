import React, { useContext } from 'react';
import styled from 'styled-components';
import { AuthStateContext } from '../../Context/AuthContext';
import { IssueInfoDispatchContext } from '../../Context/IssueInfoContext';
import { uploadRequest } from '../../Api';

const ContentWrapper = styled.div`
  margin: 10px 0;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const InputContent = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: none;
  font-size: 14px;
`;

const InputFileLabel = styled.label`
  display: block;
  width: 100%;
  padding: 5px 15px;
  color: ${(props) => props.theme.darkgrayColor};
  background: none;
  border-top: ${(props) => props.theme.borderDashed};
  text-align: left;
  cursor: pointer;
`;

const InputFile = styled.input`
  display: none;
`;

const InputComment = () => {
  const authState = useContext(AuthStateContext);
  const issueInfoDispatch = useContext(IssueInfoDispatchContext);

  const onChangeContent = (event) => {
    const data = event.target.value;
    issueInfoDispatch({ type: 'SET_CONTENT', data });
  };

  const onChangeFile = async (event) => {
    const { target } = event;
    const data = new FormData();
    data.append('file', target.files[0]);

    const config = { url: '/api/file', method: 'POST', token: authState.token, data };
    const result = await uploadRequest(config);
    const filePath = result.data;
    const text = `![images](${filePath})\n`;
    const inputContentElement = document.querySelector('#inputContent');
    const inputContentText = inputContentElement.value + text;
    issueInfoDispatch({ type: 'SET_CONTENT', data: inputContentText });
    inputContentElement.value = inputContentText;
    target.value = null;
  };

  return (
    <ContentWrapper>
      <InputContent
        placeholder="Leave a comment"
        id="inputContent"
        rows="10"
        onChange={onChangeContent}
      />
      <InputFileLabel htmlFor="inputFile">Attach files by selecting here</InputFileLabel>
      <InputFile
        type="file"
        id="inputFile"
        accept="image/jpg, image/png, image/jpeg"
        onChange={onChangeFile}
      />
    </ContentWrapper>
  );
};

export default InputComment;
