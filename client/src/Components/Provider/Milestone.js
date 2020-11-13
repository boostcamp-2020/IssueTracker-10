import React, { useReducer } from 'react';
import {
  MilestoneStateContext,
  MilestoneDispatchContext,
  initialMilestoneState,
  milestoneReducer,
} from '../../Context/MilestoneContext';

export default ({ children }) => {
  const [state, dispatch] = useReducer(milestoneReducer, initialMilestoneState);
  return (
    <MilestoneStateContext.Provider value={state}>
      <MilestoneDispatchContext.Provider value={dispatch}>
        {children}
      </MilestoneDispatchContext.Provider>
    </MilestoneStateContext.Provider>
  );
};
