import React, { useState } from 'react';
import styled from 'styled-components';
import { GearIcon } from './static/svgIcons';
import SideBarModal from './SideBarModal';

const Container = styled.div`
  position: relative;
  padding: 20px 0;
  border-bottom: ${(props) => props.theme.border};
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  cursor: pointer;

  & svg {
    fill: ${(props) => props.theme.grayColor};
  }

  &:hover {
    & * {
      color: ${(props) => props.theme.blueColor};
      fill: ${(props) => props.theme.blueColor};
    }
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => props.theme.darkgrayColor};
`;

const Content = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.darkgrayColor};
`;

const SideBarElement = ({ title, content }) => {
  const [modalDisplay, setModalDisplay] = useState(false);
  const toggleModal = () => {
    // TODO: 전체 화면 클릭시, 모달이 띄워져 있으면 닫히도록 이벤트 수정
    setModalDisplay(!modalDisplay);
  };

  return (
    <Container>
      <HeaderWrapper onClick={toggleModal}>
        <Title>{title}</Title>
        <GearIcon size="20" />
      </HeaderWrapper>
      {modalDisplay && <SideBarModal type={title} />}
      <Content>{content}</Content>
    </Container>
  );
};

export default SideBarElement;
