import React from 'react';
import styled from 'styled-components';
import { convertTime } from '../../utils/convert';
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

const LabelListRow = ({ milestone }) => {
  const { title, description, dateString, updatedAt, closed, open } = milestone;
  const dateTime = `Last updated about ${convertTime(updatedAt)}`;
  const total = closed + open;
  const closedPercent = total ? `${`${(closed / total) * 100}`.toString().slice(0, 4)}%` : '0%';

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
          <LinkText>Edit</LinkText>
          <LinkText>Close</LinkText>
          <LinkText>Delete</LinkText>
        </Row>
      </Column>
    </Wrapper>
  );
};

export default LabelListRow;
