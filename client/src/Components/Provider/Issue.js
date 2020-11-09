import React, { useReducer } from 'react';
import {
  IssueStateContext,
  IssueDispatchContext,
  issueReducer,
  initialIssueState,
} from '../../Context/IssueContext';

export default ({ children }) => {
  const [state, dispatch] = useReducer(issueReducer, initialIssueState);
  return (
    <IssueStateContext.Provider value={state}>
      <IssueDispatchContext.Provider value={dispatch}>{children}</IssueDispatchContext.Provider>
    </IssueStateContext.Provider>
  );
};
