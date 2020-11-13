import React from 'react';
import styled from 'styled-components';
import BoldText from '../Common/BoldText';
import Button from '../Common/Button';
import { theme } from '../../theme';

const Modal = styled.div`
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 350px;
  min-height: 100px;
  border: none;
  border-radius: ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.whiteColor};
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top-left-radius: ${(props) => props.theme.radius};
  border-top-right-radius: ${(props) => props.theme.radius};
  border-bottom: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.blueColor};
  color: ${(props) => props.theme.whiteColor};
`;

const HeaderText = styled(BoldText)`
  font-size: 12px;
`;

const Text = styled.div`
  padding: 15px;
  font-size: 12px;
  line-height: 18px;
`;

const CloseButton = styled.button`
  background: ${(props) => props.theme.blueColor};
  font-size: 20px;
  color: ${(props) => props.theme.skyblueColor};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.whiteColor};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 1px solid ${(props) => props.theme.lightGrayColor};
`;

const DeleteButton = styled(Button)`
  width: 100px;
`;

const CancelButton = styled(Button)`
  width: 100px;
`;

const FilterModal = ({ toggleDisplay, onClickDelete }) => {
  const cancelButtonColor = theme.skyblueColor;
  const deleteButtonColor = theme.redColor;

  return (
    <Modal>
      <ModalHeader>
        <HeaderText text="Delete" />
        <CloseButton onClick={toggleDisplay}>&times;</CloseButton>
      </ModalHeader>
      <ModalBody>
        <Text>Are you sure? Deleting a label will remove it from all issues.</Text>
      </ModalBody>
      <ModalFooter>
        <CancelButton
          text="Cancel"
          fontColor="black"
          color={cancelButtonColor}
          onClick={toggleDisplay}
        />
        <DeleteButton text="Delete" color={deleteButtonColor} onClick={onClickDelete} />
      </ModalFooter>
    </Modal>
  );
};

export default FilterModal;
