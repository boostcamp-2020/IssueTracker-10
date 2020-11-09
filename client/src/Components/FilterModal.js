import React from 'react';
import styled from 'styled-components';
import BoldText from './BoldText';

const Modal = styled.div`
  position: absolute;
  left: -5%;
  top: 110%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  min-height: 100px;
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: ${(props) => props.theme.cardShadow};
`;

const ModalBody = styled.div``;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  align-items: center;
  background-color: ${(props) => props.theme.blueColor};
  border-top-left-radius: ${(props) => props.theme.radius};
  border-top-right-radius: ${(props) => props.theme.radius};
  border-bottom: ${(props) => props.theme.border};
  color: ${(props) => props.theme.whiteColor};
`;

const HeaderText = styled(BoldText)`
  font-size: 12px;
`;

const Text = styled.div`
  padding: 15px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.skyblueColor};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.lightGrayColor};
  }
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

const FilterModal = ({ display, setDisplay }) => {
  const toggleDisplay = () => {
    const displayValue = display === 1 ? 0 : 1;
    setDisplay(displayValue);
  };
  return (
    <>
      {display ? (
        <Modal>
          <ModalHeader>
            <HeaderText text="Filter Issues" />
            <CloseButton onClick={toggleDisplay}>&times;</CloseButton>
          </ModalHeader>
          <ModalBody>
            <Text>Open Issues and pull requests</Text>
            <Text>Your Issues</Text>
            <Text>Your pull requests</Text>
            <Text>Everything assigned to you</Text>
            <Text>Everything mentioning to you</Text>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default FilterModal;
