import { createContext } from 'react';

export const initialMilestoneState = {
  openMilestone: [],
  closeMilestone: [],
};

export const milestoneReducer = (state, action) => {
  switch (action.type) {
    case 'GET_OPEN_MILESTONE': {
      const openMilestone = action.data;
      return {
        ...state,
        openMilestone,
      };
    }
    case 'GET_CLOSE_MILESTONE': {
      const closeMilestone = action.data;
      return {
        ...state,
        closeMilestone,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const MilestoneStateContext = createContext();
export const MilestoneDispatchContext = createContext();
