import React from 'react';
import styled from 'styled-components';
import { authRequest } from '../Api';
import { GitHubLogo } from './static/svgIcons';

const Wrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  background-color: ${(props) => props.theme.blueColor};
  color: ${(props) => props.theme.blackColor};
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  padding: 70px 0 20px 0;
  font-size: 30px;
  font-weight: 800;
  color: ${(props) => props.theme.whiteColor};
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  min-width: 600px;
  margin: 0 auto;
  padding: 70px;
  border-radius: ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.whiteColor};
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const TextLabel = styled.label`
  margin: 15px 0 5px 0;
  font-size: 16px;
`;

const TextInput = styled.input`
  width: 100%;
  height: 45px;
  padding: 10px 15px;
  border: 1px solid ${(props) => props.theme.grayColor};
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.whiteColor};
  &:placeholder {
    font-size: 15px;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 60px;
  margin: 0px auto;
  margin-top: 10px;
  padding: 10px;
  border-radius: ${(props) => props.theme.radiusSmall};
  background-color: ${(props) => props.theme.blueColor};
  color: ${(props) => props.theme.whiteColor};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: white;
  }
`;

const LoginButton = styled(Button)`
  background-color: ${(props) => props.theme.redColor};
`;

const LinkToSignUp = styled.span`
  margin-top: 30px;
  color: ${(props) => props.theme.grayColor};
`;

const Text = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-right: 15px;
`;

const Login = () => {
  const onClickGitHub = async () => {
    const redirectUrl = await authRequest();
    if (redirectUrl) window.location.href = redirectUrl;
  };

  return (
    <Wrapper>
      <Title>Issue Tracker</Title>
      <FormWrapper>
        <InputWrapper>
          <TextLabel>아이디</TextLabel>
          <TextInput placeholder="아이디 입력" />
          <TextLabel>비밀번호</TextLabel>
          <TextInput placeholder="비밀번호 입력" />
        </InputWrapper>
        <LoginButton>
          <Text>로그인하기</Text>
        </LoginButton>
        <Button type="button" onClick={onClickGitHub}>
          <Text>GitHub로 로그인하기</Text>
          <GitHubLogo />
        </Button>
        <LinkToSignUp>회원이 아니신가요?</LinkToSignUp>
      </FormWrapper>
    </Wrapper>
  );
};

export default Login;
