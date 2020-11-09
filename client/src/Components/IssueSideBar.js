import React from 'react';
import styled from 'styled-components';
import SideBarElement from './SideBarElement';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin-top: 30px;
  margin-left: 20px;
`;

const NewIssue = () => {
  return (
    <Wrapper>
      <SideBarElement title="Assignees" content="No one-assign yourself" />
      <SideBarElement title="Labels" content="none yet" />
      <SideBarElement title="Milestone" content="No milestone" />
    </Wrapper>
  );
};

export default NewIssue;
