import React from 'react';
import styled from 'styled-components';
import InputComment from '../InputComment';

const Wrapper = styled.div`
  width: 100%;
  padding: 5px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 10px;
  color: ${(props) => props.theme.redColor};
  background: none;
  border: ${(props) => props.theme.border};
  font-weight: 700;
`;

const UpdateButton = styled(CancelButton)`
  margin-left: 5px;
  background-color: ${(props) => props.theme.greenColor};
  border: ${(props) => props.theme.border};
  color: ${(props) => props.theme.whiteColor};
`;

const CommentEditer = () => {
  return (
    <Wrapper>
      <InputComment rows={5} />
      <ButtonWrapper>
        <CancelButton>Cancel</CancelButton>
        <UpdateButton>Update comment</UpdateButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CommentEditer;
