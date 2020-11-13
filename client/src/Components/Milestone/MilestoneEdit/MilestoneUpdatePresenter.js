import React from 'react';
import styled from 'styled-components';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import LabelMilestoneButton from '../../Common/LabelMilestoneButton';

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

const TextArea = styled.textarea`
  width: 70%;
  height: 300px;
  padding: 20px;
  background-color: ${(props) => props.theme.brightColor};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const InputMilestone = styled(Input)`
  width: 45%;
  color: ${(props) => props.theme.blackColor};
  background-color: ${(props) => props.theme.brightColor};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const ButtonContainer = styled.div`
  width: 40%;
  height: 50px;
  padding: 20px 0;
  margin-left: auto;
`;

const EditBtton = styled(Button)`
  margin-right: 10px;
  padding: 10px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
`;
export default ({
  pathname,
  onClickUpdateMilestone,
  onChangeTitle,
  onChangeDate,
  onChangeDescription,
  greenColor,
  lightGrayColor,
  redColor,
  title,
  date,
  state,
  description,
  onClickCancelMilestone,
  onClickToggleMilestone,
}) => {
  return (
    <Wrapper>
      <RowContainer>
        <LabelMilestoneButton issueHeader="" pathname={pathname} />
      </RowContainer>
      <RowContainer>
        <InputMilestone value={title || ''} onChange={onChangeTitle} placeholder="Title" />
      </RowContainer>
      <RowContainer>
        <InputMilestone
          value={date ? date.slice(0, 10) : ''}
          onChange={onChangeDate}
          placeholder="Date"
          type="Date"
        />
      </RowContainer>
      <RowContainer>
        <TextArea
          value={description || ''}
          onChange={onChangeDescription}
          placeholder="Description"
        />
      </RowContainer>
      <RowContainer>
        <ButtonContainer>
          <ButtonRow>
            <EditBtton onClick={onClickCancelMilestone} color={lightGrayColor} text="Cancel" />
            <EditBtton
              onClick={onClickToggleMilestone}
              color={redColor}
              text={state === 1 ? 'Close milestone' : 'Reopen milestone'}
            />
            <EditBtton onClick={onClickUpdateMilestone} color={greenColor} text="Save changes" />
          </ButtonRow>
        </ButtonContainer>
      </RowContainer>
    </Wrapper>
  );
};
