import React, { useContext } from 'react';
import styled from 'styled-components';
import { IssueOpenIcon, IssueClosedIcon } from '../../static/svgIcons';
import { convertTime } from '../../../utils/convert';
import { IssueInfoContext } from '../../../Context/IssueInfoContext';

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  color: ${(props) => props.theme.blackColor};
  border-bottom: ${(props) => props.theme.border};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const IssueTitle = styled.span`
  margin-right: 5px;
  font-size: 30px;
`;

const IssueNumber = styled.span`
  color: ${(props) => props.theme.darkgrayColor};
  font-size: 30px;
  font-weight: 300;
`;

const SubTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StateBadge = styled.span`
  margin-right: 8px;
  padding: 7px 14px;
  color: ${({ theme }) => theme.whiteColor};
  background-color: ${({ state, theme }) => (state ? theme.greenColor : theme.redColor)};
  border-radius: 20px;
  line-height: 20px;
  svg {
    fill: ${({ theme }) => theme.whiteColor};
  }
`;

const Author = styled.span`
  margin-right: 4px;
  color: ${({ theme }) => theme.darkgrayColor};
  font-weight: 600;
`;

const OpenedTime = styled.span`
  color: ${({ theme }) => theme.darkgrayColor};
`;

const ButtonWrapper = styled.span`
  position: absolute;
  top: 10px;
  right: 20px;
  display: flex;
`;

export const CreateButton = styled.button`
  margin-left: 10px;
  padding: 7px 12px;
  background-color: ${({ theme }) => theme.greenColor};
  font-size: 13px;
  disabled: ${({ disabled }) => disabled};
  &:disabled {
    background-color: ${({ theme }) => theme.lightGrayColor};
  }
`;

const EditButton = styled(CreateButton)`
  color: ${({ theme }) => theme.blackColor};
  background-color: ${({ theme }) => theme.whiteColor};
  border: ${({ theme }) => theme.border};
`;

const IssueDetailHeader = () => {
  const { id, title, state, createdAt, user, commentCount } = useContext(IssueInfoContext);
  return (
    <HeaderWrapper>
      <TitleWrapper>
        <IssueTitle>{title}</IssueTitle>
        <IssueNumber>#{id}</IssueNumber>
      </TitleWrapper>
      <SubTextWrapper>
        <StateBadge state={state}>
          {state ? <IssueOpenIcon size={14} /> : <IssueClosedIcon size={14} />}
          {state ? ' Open' : ' Closed'}
        </StateBadge>
        <Author>{user && user.username}</Author>
        <OpenedTime>
          opened this issue {convertTime(createdAt)} ・ comments {commentCount}
        </OpenedTime>
      </SubTextWrapper>
      <ButtonWrapper>
        <EditButton>Edit</EditButton>
        <CreateButton>New Issue</CreateButton>
      </ButtonWrapper>
    </HeaderWrapper>
  );
};

export default IssueDetailHeader;
