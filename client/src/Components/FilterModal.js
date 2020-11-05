import React from 'react';
import styled from 'styled-components';
import FatText from './FatText';

const Modal = styled.div`
  position: absolute;
  left: -5%;
  top: 110%;
  width: 300px;
  min-height: 100px;
  border: 1px solid ${(props) => props.theme.whiteColor};
  border-radius: ${(props) => props.theme.radius};
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  opacity: ${(props) => props.display};
  transition: opacity 0.2s linear;
`;

const ModalBody = styled.div``;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid ${(props) => props.theme.lightGrayColor};
`;

const HeaderText = styled(FatText)`
  font-size: 12px;
`;

const Text = styled.div`
  font-size: 12px;
  padding: 15px;
  &:hover {
    background-color: ${(props) => props.theme.lightGrayColor};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.lightGrayColor};
  }
  cursor: pointer;
`;

const CloseButton = styled.button`
  font-size: 20px;
  color: ${(props) => props.theme.lightGrayColor};
  background: ${(props) => props.theme.whiteColor};
  &:hover {
    color: ${(props) => props.theme.blackColor};
  }
  cursor: pointer;
`;

const FilterModal = ({ display }) => {
  return (
    <Modal display={display}>
      <ModalHeader>
        <HeaderText text="Filter Issues" />
        <CloseButton>&times;</CloseButton>
      </ModalHeader>
      <ModalBody>
        <Text>Open Issues and pull requests</Text>
        <Text>Your Issues</Text>
        <Text>Your pull requests</Text>
        <Text>Everything assigned to you</Text>
        <Text>Everything mentioning to you</Text>
      </ModalBody>
    </Modal>
  );
};

export default FilterModal;
