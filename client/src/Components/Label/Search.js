import React, { useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { request } from '../../Api';
import { AuthStateContext, AuthDispatchContext } from '../../Context/AuthContext';
import { LabelDispatchContext, LabelStateContext } from '../../Context/LabelContext';
import BoldText from '../Common/BoldText';
import LabelMilestoneButton from '../Common/LabelMilestoneButton';
import { XIcon } from '../static/svgIcons';
import LabelFilter from './LabelFilter';
import LabelList from './LabelList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 1100px;
  margin-top: 20px;
`;

const ColumnContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  &:last-child {
    width: 60%;
  }
`;

const BackLink = styled(BoldText)`
  color: ${(props) => props.theme.skyblueColor};
`;

const CancelIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  padding: 3px;
  background-color: ${(props) => props.theme.skyblueColor};
  border-radius: ${(props) => props.theme.radiusSmall};
  svg {
    fill: ${(props) => props.theme.whiteColor};
  }
`;
const CancelWrapper = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    svg {
      fill: ${(props) => props.theme.skyblueColor};
    }
    span {
      color: ${(props) => props.theme.blueColor};
    }
    div {
      background-color: ${(props) => props.theme.blueColor};
    }
  }
`;

export default withRouter(({ location: { search }, token }) => {
  const query = search.split('=')[1].toLowerCase().trim();

  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const labelState = useContext(LabelStateContext);
  const labelDispatch = useContext(LabelDispatchContext);

  const labelList = labelState.labels.filter((element) =>
    element.title.toLowerCase().trim().includes(query),
  );

  useEffect(() => {
    if (!authState.token) authDispatch({ type: 'LOGIN', token });
  }, []);

  useEffect(() => {
    if (authState.token) {
      const fetchLabels = async () => {
        const config = { url: '/api/label', method: 'GET', token: authState.token };
        const { data } = await request(config);
        if (data) labelDispatch({ type: 'GET', labels: data });
      };
      fetchLabels();
    }
  }, [authState.token]);

  return (
    <Wrapper>
      <RowContainer>
        <ColumnContainer>
          <LabelMilestoneButton issueHeader="" />
          <LabelFilter />
        </ColumnContainer>
      </RowContainer>
      <RowContainer>
        <Link to="/labels">
          <CancelWrapper>
            <CancelIcon>
              <XIcon size={12} />
            </CancelIcon>
            <BackLink text="Clear current search" />
          </CancelWrapper>
        </Link>
      </RowContainer>
      <RowContainer>
        <LabelList labels={labelList} />
      </RowContainer>
    </Wrapper>
  );
});
