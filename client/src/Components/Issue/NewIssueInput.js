import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Input from '../Common/Input';
import GreenButton from '../Common/GreenButton';
import { request } from '../../Api';
import { AuthStateContext } from '../../Context/AuthContext';
import { IssueInfoContext } from '../../Context/IssueInfoContext';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`;

const UserAvater = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 15px;
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const InputWrapper = styled.form`
  width: 100%;
  padding: 10px;
  border-radius: ${(props) => props.theme.radiusSmall};
  border: ${(props) => props.theme.border};
`;

const InputTitle = styled(Input)`
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  font-size: 18px;
`;

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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LinkToMain = styled.a`
  display: inline-block;
  margin-left: 5px;
  line-height: 40px;
  vertical-align: middle;
  color: ${(props) => props.theme.blackColor};
  background: none;
`;

const NewIssue = () => {
  const authState = useContext(AuthStateContext);
  const issueInfoState = useContext(IssueInfoContext);
  const { token, user } = authState;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(true);

  const onChangeTitle = (event) => {
    const text = event.target.value;
    setTitle(text);
    return text.length === 0 ? setDisabled(true) : setDisabled(false);
  };

  const onChangeContent = (event) => {
    const text = event.target.value;
    setContent(text);
  };

  const onChangeFile = (event) => {
    // TODO: 이미지 파일일 경우에만 사진 업로드 및 comment에 url 추가
  };

  const submitNewIssue = async () => {
    const { assignees, labels, milestone } = issueInfoState;
    const data = {
      title,
      content,
      assignees: assignees.map((ele) => ele.id),
      labels: labels.map((ele) => ele.id),
      milestoneId: milestone ? milestone.id : null,
    };

    const config = { url: '/api/issue', method: 'POST', data, token };
    const result = await request(config);

    if (result.message) {
      // TODO: 이슈 페이지 or 이슈 상세페이지로 이동
      alert('생성 성공!');
      return;
    }

    alert('생성 실패!');
  };

  return (
    <Wrapper>
      <UserAvater src={user.avatar} alt={`${user.username} profile`} />
      <InputWrapper>
        <InputTitle type="text" placeholder="Title" required onChange={onChangeTitle} />
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
        <ButtonWrapper>
          <LinkToMain href="/">Cancel</LinkToMain>
          <GreenButton
            title="Submit new issue"
            onClickHandler={submitNewIssue}
            disabled={disabled}
          />
        </ButtonWrapper>
      </InputWrapper>
    </Wrapper>
  );
};

export default NewIssue;
