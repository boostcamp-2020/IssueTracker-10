import React from 'react';
import styled from 'styled-components';
import Input from './Input';
import GreenButton from './GreenButton';

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
  return (
    <Wrapper>
      <UserAvater src="https://user-images.githubusercontent.com/49746644/98506257-6c2d0900-229e-11eb-8e94-d5dac331df82.jpg" />
      <InputWrapper>
        <InputTitle type="text" placeholder="Title" required />
        <InputContent placeholder="Leave a comment" rows="10" />
        <ButtonWrapper>
          <LinkToMain href="/">Cancel</LinkToMain>
          <GreenButton title="Submit new issue" />
        </ButtonWrapper>
      </InputWrapper>
    </Wrapper>
  );
};

export default NewIssue;
