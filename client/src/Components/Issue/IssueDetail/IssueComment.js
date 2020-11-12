import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import CommentEditor from './CommentEditor';
import { IssueInfoDispatchContext } from '../../../Context/IssueInfoContext';
import { convertTime } from '../../../utils/convert';

export const CommentWrapper = styled.div`
  display: flex;
  align-items: top;
  padding: 20px 5px;
`;

export const UserAvater = styled.img`
  margin: 0 5px;
  width: 40px;
  height: 40px;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 10px;
  background-color: ${(props) => props.theme.whiteColor};
  border: ${(props) => props.theme.border};
  border-radius: ${(props) => props.theme.radiusSmall};
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  color: ${(props) => props.theme.whiteColor};
  background-color: ${(props) => props.theme.blueColor};
  border-radius: ${(props) => props.theme.radiusTop};
`;

const HeaderText = styled.span`
  font-size: 13px;
`;

const Name = styled.span`
  font-weight: 600;
`;

const Content = styled.div`
  min-height: 20px;
  padding: 15px;
  background-color: ${(props) => props.theme.whiteColor};
  font-size: 13px;
`;

const Badge = styled.span`
  padding: 3px;
  border: 1px solid ${(props) => props.theme.whiteColor};
  border-radius: ${(props) => props.theme.radiusSmall};
  font-size: 13px;
`;

const EditButton = styled.button`
  margin-left: 10px;
  padding: 0;
  background: none;
  font-size: 15px;
`;

const EditorWrapper = styled.div``;

const IssueComment = (props) => {
  const { id, user, content, createdAt, isAuthor, isEditer } = props;
  const [edit, setEdit] = useState(false);
  const issueInfoDispatch = useContext(IssueInfoDispatchContext);
  const [comment, setComment] = useState(content);

  const onClickEditComment = () => {
    setEdit(true);
    issueInfoDispatch({ type: 'SET_CONTENT', data: comment });
  };

  return (
    <CommentWrapper key={id}>
      <UserAvater src={user.avatar} />
      <ContentWrapper>
        <ContentHeader>
          <HeaderText>
            <Name>{user.username}</Name> commented {convertTime(createdAt)}
          </HeaderText>
          <EditorWrapper>
            <Badge>{isAuthor ? 'Author' : 'Member'}</Badge>
            {isEditer ? <EditButton onClick={onClickEditComment}>Edit</EditButton> : null}
          </EditorWrapper>
        </ContentHeader>
        {edit ? (
          <CommentEditor commentId={id} setEdit={setEdit} setComment={setComment} />
        ) : (
          <Content>{comment || 'No description provided.'}</Content>
        )}
      </ContentWrapper>
    </CommentWrapper>
  );
};

export default IssueComment;
