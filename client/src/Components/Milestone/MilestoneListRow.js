import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '../../Api';
import { AuthStateContext } from '../../Context/AuthContext';
import { MilestoneDispatchContext } from '../../Context/MilestoneContext';
import { convertTime } from '../../utils/convert';
import getPercent from '../../utils/getPercent';
import BoldText from '../Common/BoldText';
import ProgressBar from '../Common/ProgressBar';
import { CalendarIcon, TimeIcon } from '../static/svgIcons';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
  padding: 20px;
  border-top: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.brightColor};
  &:hover {
    background-color: ${(props) => props.theme.whiteColor};
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  span {
    margin-right: 10px;
  }
  div {
    margin-right: 10px;
  }
`;

const MilestoneTitle = styled(BoldText)`
  font-size: 24px;
  font-weight: 400;
  line-height: 1.5;
  &:hover {
    color: ${(props) => props.theme.blueColor};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const DateColumn = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.blueColor};
  font-size: 14px;
  line-height: 1.5;
  span {
    margin-left: 5px;
  }
  svg {
    fill: ${(props) => props.theme.blueColor};
  }
`;

const UpdateTimeColumn = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.blueColor};
  font-size: 14px;
  line-height: 1.5;
  span {
    margin-left: 5px;
  }
  svg {
    fill: ${(props) => props.theme.blueColor};
  }
`;

const ProgressInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 12px;
`;

const Description = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 14px;
`;

const FatText = styled(BoldText)`
  color: ${(props) => props.theme.blueColor};
`;

const LinkText = styled(Text)`
  font-size: 15px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:last-child {
    &:hover {
      text-decoration: none;
    }
    color: ${(props) => props.theme.redColor};
  }
`;

const MilestoneListRow = ({ milestone }) => {
  const { id, title, description, dateString, updatedAt, closed, open, state } = milestone;
  const dateTime = `Last updated about ${convertTime(updatedAt)}`;
  const authState = useContext(AuthStateContext);
  const milestoneDispatch = useContext(MilestoneDispatchContext);
  const total = closed + open;
  const closedPercent = getPercent(closed, total);
  const history = useHistory();

  const deleteMilestone = async () => {
    const config = {
      url: `/api/milestone/${id}`,
      method: 'DELETE',
      token: authState.token,
    };
    try {
      await request(config);
      if (state === 1) {
        milestoneDispatch({ type: 'DELETE_OPEN_MILESTONE', id });
      } else {
        milestoneDispatch({ type: 'DELETE_CLOSED_MILESTONE', id });
      }
    } catch (err) {
      throw new Error(err.response);
    }
  };

  const toggleMilestone = async () => {
    const inputData = { state: state === 0 ? 1 : 0 };
    const config = {
      url: `/api/milestone/${id}/state`,
      method: 'PUT',
      token: authState.token,
      data: inputData,
    };
    await request(config);
    if (state === 1) {
      history.push('/milestones');
    } else {
      history.push('/milestones?state=closed');
    }
  };

  const onClickDelete = () => {
    deleteMilestone();
  };

  const onClickToggleMilestone = () => {
    toggleMilestone();
  };

  return (
    <Wrapper>
      <Column>
        <Row>
          <MilestoneTitle text={title} />
        </Row>
        <Row>
          <DateColumn>
            <CalendarIcon />
            <Text>{dateString}</Text>
          </DateColumn>
          <UpdateTimeColumn>
            <TimeIcon />
            <Text>{dateTime}</Text>
          </UpdateTimeColumn>
        </Row>
        <Row>
          <Description>{description}</Description>
        </Row>
      </Column>
      <Column>
        <Row>
          <ProgressBar percent={closedPercent} />
        </Row>
        <Row>
          <ProgressInfo>
            <FatText text={closedPercent} />
            <Text>complete</Text>
          </ProgressInfo>
          <ProgressInfo>
            <FatText text={open} />
            <Text>open</Text>
          </ProgressInfo>
          <ProgressInfo>
            <FatText text={closed} />
            <Text>closed</Text>
          </ProgressInfo>
        </Row>
        <Row>
          <Link to={`milestones/${id}/edit`}>
            <LinkText>Edit</LinkText>
          </Link>
          <LinkText onClick={onClickToggleMilestone}>{state === 0 ? 'Open' : 'Close'}</LinkText>
          <LinkText onClick={onClickDelete}>Delete</LinkText>
        </Row>
      </Column>
    </Wrapper>
  );
};

export default MilestoneListRow;
