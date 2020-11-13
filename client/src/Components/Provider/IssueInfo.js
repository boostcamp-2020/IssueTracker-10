import React, { useReducer } from 'react';
import {
  IssueInfoContext,
  IssueInfoDispatchContext,
  issueInfoReducer,
  initIssueInfo,
} from '../../Context/IssueInfoContext';

export default ({ children }) => {
  const [state, dispatch] = useReducer(issueInfoReducer, initIssueInfo);
  return (
    <IssueInfoContext.Provider value={state}>
      <IssueInfoDispatchContext.Provider value={dispatch}>
        {children}
      </IssueInfoDispatchContext.Provider>
    </IssueInfoContext.Provider>
  );
};
