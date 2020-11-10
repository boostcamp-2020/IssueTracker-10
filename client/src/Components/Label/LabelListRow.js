import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { request } from '../../Api';
import { AuthStateContext } from '../../Context/AuthContext';
import { LabelDispatchContext } from '../../Context/LabelContext';
import LabelBadge from './LabelBadge';
import LabelUpdateModal from './LabelUpdateModal';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: top;
  padding: 20px;
  border-top: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.brightColor};
  &:hover {
    background-color: ${(props) => props.theme.whiteColor};
  }
`;

const RowWrapper = styled.div`
  display: flex;
`;

const BadgeColumn = styled.div`
  margin-right: auto;
`;

const DescriptColumn = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const EditColumn = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  color: ${(props) => props.theme.grayColor};
  font-size: 12px;
  margin: 0 10px;
  background: none;
`;

const DescriptText = styled.span`
  color: ${(props) => props.theme.grayColor};
`;

const LabelListRow = ({ label }) => {
  const { title, description, color } = label;
  const [display, setDisplay] = useState(false);
  const authState = useContext(AuthStateContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const toggleDisplay = () => {
    setDisplay(!display);
  };

  const deleteLabel = async (inputData) => {
    const config = { url: `/api/label/${inputData.id}`, method: 'DELETE', token: authState.token };
    try {
      await request(config);
    } catch (err) {
      throw new Error(err.response);
    }
  };

  const onClickDelete = () => {
    labelDispatch({ type: 'DELETE', label });
    deleteLabel(label);
  };
  return (
    <Wrapper>
      <RowWrapper>
        {display ? (
          <LabelUpdateModal
            initLabel={label}
            setDisplay={setDisplay}
            toggleDisplay={toggleDisplay}
          />
        ) : (
          <>
            <BadgeColumn>
              <LabelBadge title={title} color={color} />
            </BadgeColumn>
            <DescriptColumn>
              <DescriptText>{description}</DescriptText>
            </DescriptColumn>
            <EditColumn>
              <Button onClick={toggleDisplay}>Edit</Button>
              <Button onClick={onClickDelete}>Delete</Button>
            </EditColumn>
          </>
        )}
      </RowWrapper>
    </Wrapper>
  );
};

export default LabelListRow;
