import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IssueInfoDispatchContext } from '../../Context/IssueInfoContext';

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
  const issueInfoDispatch = useContext(IssueInfoDispatchContext);

  const onChangeContent = (event) => {
    const data = event.target.value;
    issueInfoDispatch({ type: 'SET_CONTENT', data });
  };

  const onChangeFile = (event) => {
    // TODO: 이미지 파일일 경우에만 사진 업로드 및 comment에 url 추가
  };

  return (
    <ContentWrapper>
      <InputContent placeholder="Leave a comment" rows="10" onChange={onChangeContent} />
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
