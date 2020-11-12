import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { convertTime } from '@Util/convert';
import { IssueOpenIcon, IssueClosedIcon } from '@Svg/svgIcons';
import { IssueInfoContext } from '@Context/IssueInfoContext';
import IssueTitle from './IssueTitle';
import IssueTitleEditor from './IssueTitleEditor';

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  color: ${(props) => props.theme.blackColor};
  border-bottom: ${(props) => props.theme.border};
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

const IssueDetailHeader = () => {
  const { id, title, state, createdAt, user, commentCount } = useContext(IssueInfoContext);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <HeaderWrapper>
      {isEdit ? (
        <IssueTitleEditor id={id} title={title} setIsEdit={setIsEdit} />
      ) : (
        <IssueTitle id={id} title={title} setIsEdit={setIsEdit} />
      )}
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
    </HeaderWrapper>
  );
};

export default IssueDetailHeader;
