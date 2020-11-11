import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { request } from '../../Api';
import { AuthStateContext, AuthDispatchContext } from '../../Context/AuthContext';
import { MilestoneDispatchContext, MilestoneStateContext } from '../../Context/MilestoneContext';
import { theme } from '../../theme';
import Button from '../Common/Button';
import LabelMilestoneButton from '../Common/LabelMilestoneButton';
import MilestoneList from './MilestoneList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.div`
  margin-top: 20px;
  width: 1100px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
`;

const ColumnContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  &:last-child {
    width: 10%;
  }
`;

const Milestone = ({ token, location: { search } }) => {
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const milestoneState = useContext(MilestoneStateContext);
  const milestoneDispatch = useContext(MilestoneDispatchContext);
  const [display, setDisplay] = useState(false);
  const [isClosedPage, setClosedPage] = useState(false);
  const { greenColor } = theme;

  const toggleDisplay = () => {
    const displayValue = !display;
    setDisplay(displayValue);
  };

  useEffect(() => {
    if (!authState.token) authDispatch({ type: 'LOGIN', token });
  }, []);

  useEffect(() => {
    if (authState.token) {
      const fetchOpenMilestone = async () => {
        const params = { state: 1 };
        const config = { url: '/api/milestone', method: 'GET', token: authState.token, params };
        const { data } = await request(config);
        if (data) milestoneDispatch({ type: 'GET_OPEN_MILESTONE', data });
      };
      const fetchClosedMilestone = async () => {
        const params = { state: 0 };
        const config = { url: '/api/milestone', method: 'GET', token: authState.token, params };
        const { data } = await request(config);
        if (data) milestoneDispatch({ type: 'GET_CLOSE_MILESTONE', data });
      };
      fetchOpenMilestone();
      fetchClosedMilestone();
      if (search) setClosedPage(true);
    }
  }, [authState.token]);

  return (
    <Wrapper>
      <RowContainer>
        <ColumnContainer>
          <LabelMilestoneButton issueHeader="" />
        </ColumnContainer>
        <ColumnContainer>
          <Button onClick={toggleDisplay} text="New Milestone" color={greenColor} />
        </ColumnContainer>
      </RowContainer>
      <RowContainer>
        <MilestoneList
          setClosedPage={setClosedPage}
          isClosedPage={isClosedPage}
          openMilestone={milestoneState.openMilestone}
          closedMilestone={milestoneState.closeMilestone}
        />
      </RowContainer>
    </Wrapper>
  );
};

export default Milestone;
