import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Input from './Input';
import GreenButton from './GreenButton';
import { request } from '../Api';
import { AuthStateContext } from '../Context/AuthContext';

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

const InputContent = styled.textarea`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 15px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
  font-size: 14px;
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
  const state = useContext(AuthStateContext);
  const { token } = state;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [disabled, setDisabled] = useState(true);

  const titleChange = (event) => {
    const text = event.target.value;
    setTitle(text);
    if (text.length === 0) return setDisabled(true);
    return setDisabled(false);
  };

  const contentChange = (event) => {
    const text = event.target.value;
    setContent(text);
  };

  const submitNewIssue = async () => {
    const data = {
      title,
      content,
      // TODO: Assignees, labels, milestone 정보도 추가할 것
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
      <UserAvater src="https://user-images.githubusercontent.com/49746644/98506257-6c2d0900-229e-11eb-8e94-d5dac331df82.jpg" />
      <InputWrapper>
        {/* onChange 이벤트가 발생할 때마다 현재 컴포넌트가 재렌더링 되므로 InputTitle과 InputContent를 컴포넌트 분할시키는 것도 괜찮을 것 같다..? */}
        <InputTitle type="text" placeholder="Title" required onChange={titleChange} />
        <InputContent placeholder="Leave a comment" rows="10" onChange={contentChange} />
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
