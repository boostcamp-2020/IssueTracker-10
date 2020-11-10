import React from 'react';
import styled from 'styled-components';
import BoldText from '../../Common/BoldText';
import Button from '../../Common/Button';
import Input from '../../Common/Input';
import LabelBadge from '../LabelBadge';
import { CycleIcon } from '../../static/svgIcons';
import Balloon from '../../Common/Balloon';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  padding: 20px;
  background-color: ${(props) => props.theme.skyblueColor};
  border-radius: ${(props) => props.theme.radiusSmall};
`;
const LabelRow = styled.div`
  width: 100px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50%;
`;

const InputColumn = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 0;
`;

const ColorButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.theme.radiusSmall};
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
  svg {
    fill: ${(props) => props.fontColor};
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InputBoldText = styled(BoldText)`
  margin-bottom: 10px;
`;

const LabelInput = styled(Input)`
  border-radius: ${(props) => props.theme.radiusSmall};
  height: 30px;
  width: 100%;
`;

const CreateButton = styled(Button)`
  margin-top: 25px;
  width: 100px;
`;

const CancelButton = styled(Button)`
  margin-top: 25px;
  margin-right: 10px;
  width: 70px;
`;

const InvalidText = styled(BoldText)`
  margin-bottom: 10px;
  color: red;
`;

export default ({
  color,
  title,
  isExist,
  fontColor,
  cancelButtonColor,
  createLabelButtonColor,
  clickCreateLabelButton,
  onChangeColor,
  onChangeDescription,
  onChangeTitle,
  changeColor,
  toggleDisplay,
  redColor,
}) => (
  <Wrapper>
    <Container>
      <LabelRow>
        <LabelBadge color={color} title={title || 'Label preview'} fontColor={fontColor} />
      </LabelRow>
      <InputRow>
        <InputColumn>
          {isExist ? (
            <>
              <InvalidText text="Label name" />
              <LabelInput
                name="title"
                placeholder="Label name"
                required
                onChange={onChangeTitle}
                maxLength={25}
              />
              <Balloon text="Name has already been taken" color={redColor} fontColor="black" />
            </>
          ) : (
            <>
              <InputBoldText text="Label name" />
              <LabelInput
                name="title"
                placeholder="Label name"
                required
                onChange={onChangeTitle}
                maxLength={25}
              />
            </>
          )}
        </InputColumn>
        <InputColumn>
          <InputBoldText text="Description" />
          <LabelInput
            name="description"
            placeholder="Description (optional)"
            onChange={onChangeDescription}
          />
        </InputColumn>
        <InputColumn>
          <InputBoldText text="Color" />
          <InnerWrapper>
            <ColorButton fontColor={fontColor} onClick={changeColor} color={color}>
              <CycleIcon size={20} />
            </ColorButton>
            <LabelInput
              name="color"
              placeholder="Color(Hex)"
              value={color || ''}
              required
              onChange={onChangeColor}
            />
          </InnerWrapper>
        </InputColumn>
        <InputColumn>
          <InnerWrapper>
            <CancelButton
              text="Cancel"
              fontColor="black"
              color={cancelButtonColor}
              onClick={toggleDisplay}
            />
            <CreateButton
              text="Create label"
              color={createLabelButtonColor}
              onClick={clickCreateLabelButton}
              disabled={isExist}
            />
          </InnerWrapper>
        </InputColumn>
      </InputRow>
    </Container>
  </Wrapper>
);
