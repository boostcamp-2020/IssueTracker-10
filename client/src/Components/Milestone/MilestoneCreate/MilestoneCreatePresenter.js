import React from 'react';
import styled from 'styled-components';
import BoldText from '../../Common/BoldText';
import Button from '../../Common/Button';
import Input from '../../Common/Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 1100px;
  margin-top: 20px;
  &:nth-child(2) {
    padding-bottom: 20px;
    border-bottom: ${(props) => props.theme.border};
  }
  &:last-child {
    border-top: ${(props) => props.theme.border};
    border-bottom: ${(props) => props.theme.border};
    padding-bottom: 50px;
  }
`;

const HelpText = styled.div`
  font-size: 14px;
`;
const TextArea = styled.textarea`
  width: 70%;
  height: 300px;
  padding: 20px;
  background-color: ${(props) => props.theme.brightColor};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const HeaderText = styled(BoldText)`
  font-size: 24px;
  font-weight: 400px;
`;

const LinkText = styled.a`
  margin-left: 5px;
  color: ${(props) => props.theme.blueColor};
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
`;

const InputMilestone = styled(Input)`
  width: 45%;
  color: ${(props) => props.theme.blackColor};
  background-color: ${(props) => props.theme.brightColor};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const ButtonContainer = styled.div`
  height: 50px;
  padding: 20px 0;
  margin-left: auto;
`;

const CreateButton = styled(Button)`
  padding: 10px;
`;

export default ({
  helpText,
  onChangeTitle,
  onChangeDate,
  onChangeDescription,
  clickCreateMilestone,
  history,
  greenColor,
}) => {
  return (
    <Wrapper>
      <RowContainer>
        <HeaderText text="New milestone" />
      </RowContainer>
      <RowContainer>
        <HelpText>{helpText}</HelpText>
        <LinkText href="https://guides.github.com/features/issues/">
          milestones and issues.
        </LinkText>
      </RowContainer>
      <RowContainer>
        <InputMilestone onChange={onChangeTitle} placeholder="Title" />
      </RowContainer>
      <RowContainer>
        <InputMilestone onChange={onChangeDate} placeholder="Date" type="Date" />
      </RowContainer>
      <RowContainer>
        <TextArea onChange={onChangeDescription} placeholder="Description" />
      </RowContainer>
      <RowContainer>
        <ButtonContainer>
          <CreateButton
            onClick={() => clickCreateMilestone(history)}
            color={greenColor}
            text="Create milestone"
          />
        </ButtonContainer>
      </RowContainer>
    </Wrapper>
  );
};
