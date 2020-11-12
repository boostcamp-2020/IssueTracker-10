import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { getFontColor } from '@Util/color';
import { toast } from 'react-toastify';
import { request } from '../../Api';
import { AuthDispatchContext, AuthStateContext } from '../../Context/AuthContext';
import { LabelDispatchContext } from '../../Context/LabelContext';
import LabelBadge from './LabelBadge';
import LabelUpdateModal from './LabelUpdateModal';
import LabelDeleteModal from './LabelDeleteModal';

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
  color: ${(props) => props.theme.darkgrayColor};
  font-size: 12px;
  margin: 0 10px;
  background: none;
`;

const DescriptText = styled.span`
  color: ${(props) => props.theme.grayColor};
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const LabelListRow = ({ label }) => {
  const { title, description, color } = label;
  const [display, setDisplay] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const labelDispatch = useContext(LabelDispatchContext);
  const fontColor = getFontColor(color);

  const toggleDisplay = () => {
    setDisplay(!display);
  };
  const toggleDisplayModal = () => {
    setDisplayModal(!displayModal);
  };

  const deleteLabel = async (inputData) => {
    const config = { url: `/api/label/${inputData.id}`, method: 'DELETE', token: authState.token };
    try {
      const result = await request(config);
      if (result.status === 401) authDispatch({ type: 'LOGOUT' });
      toast.success('Success! 😄');
    } catch (err) {
      toast.error('Fail! 😭');
    }
  };

  const onClickDelete = () => {
    labelDispatch({ type: 'DELETE', label });
    deleteLabel(label);
  };
  return (
    <Wrapper>
      {displayModal && (
        <>
          <Overlay />
          <LabelDeleteModal toggleDisplay={toggleDisplayModal} onClickDelete={onClickDelete} />
        </>
      )}
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
              <LabelBadge title={title} color={color} fontColor={fontColor} />
            </BadgeColumn>
            <DescriptColumn>
              <DescriptText>{description}</DescriptText>
            </DescriptColumn>
            <EditColumn>
              <Button onClick={toggleDisplay}>Edit</Button>
              <Button onClick={toggleDisplayModal}>Delete</Button>
            </EditColumn>
          </>
        )}
      </RowWrapper>
    </Wrapper>
  );
};

export default LabelListRow;
