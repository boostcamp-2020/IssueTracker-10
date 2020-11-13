import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.span`
  margin-right: 5px;
  font-size: 30px;
`;

const IssueNumber = styled.span`
  color: ${(props) => props.theme.darkgrayColor};
  font-size: 30px;
  font-weight: 300;
`;

const ButtonWrapper = styled.span`
  position: absolute;
  right: 20px;
  display: flex;
`;

const EditButton = styled(Button)`
  color: ${({ theme }) => theme.blackColor};
  background-color: ${({ theme }) => theme.whiteColor};
  border: ${({ theme }) => theme.border};
`;

const IssueTitle = (props) => {
  const { id, title = '', setIsEdit } = props;
  const onClickEdit = () => setIsEdit(true);

  return (
    <TitleWrapper>
      <Title>{title}</Title>
      <IssueNumber>#{id}</IssueNumber>
      <ButtonWrapper>
        <EditButton text="Edit" onClick={onClickEdit} />
        <Link to="/issue/new">
          <Button text="New Issue" />
        </Link>
      </ButtonWrapper>
    </TitleWrapper>
  );
};

export default IssueTitle;
