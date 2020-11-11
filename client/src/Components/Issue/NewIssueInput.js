import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Input from '../Common/Input';
import GreenButton from '../Common/GreenButton';
import InputComment from './InputComment';
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

const NewIssue = ({ history }) => {
  const authState = useContext(AuthStateContext);
  const issueInfoState = useContext(IssueInfoContext);
  const { token, user } = authState;
  const [title, setTitle] = useState('');
  const [disabled, setDisabled] = useState(true);

  const onChangeTitle = (event) => {
    const text = event.target.value;
    setTitle(text);
    return text.length === 0 ? setDisabled(true) : setDisabled(false);
  };

  const submitNewIssue = async () => {
    const { content, assignees, labels, milestone } = issueInfoState;
    const data = {
      title,
      content,
      assignees: assignees.map((ele) => ele.id),
      labels: labels.map((ele) => ele.id),
      milestoneId: milestone ? milestone.id : null,
    };

    const config = { url: '/api/issue', method: 'POST', data, token };
    const result = await request(config);

    if (result) {
      const issueId = result.id;
      history.push(`/issue/${issueId}`);
    }
  };

  return (
    <Wrapper>
      <UserAvater src={user.avatar} alt={`${user.username} profile`} />
      <InputWrapper>
        <InputTitle type="text" placeholder="Title" required onChange={onChangeTitle} />
        <InputComment />
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
