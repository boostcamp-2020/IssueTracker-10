import { createContext } from 'react';

export const initialMilestoneState = {
  openMilestone: [],
  closeMilestone: [],
  milestoneDetail: '',
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
    case 'CREATE_MILESTONE': {
      const { milestone } = action;
      return {
        openMilestone: [milestone, ...state.openMilestone],
      };
    }
    case 'GET_DETAIL_MILESTONE': {
      const { milestone } = action;
      return {
        milestoneDetail: milestone,
      };
    }
    case 'DELETE_OPEN_MILESTONE': {
      return {
        openMilestone: state.openMilestone.filter((milestone) => milestone.id !== action.id),
      };
    }
    case 'DELETE_CLOSED_MILESTONE': {
      return {
        closeMilestone: state.closeMilestone.filter((milestone) => milestone.id !== action.id),
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const MilestoneStateContext = createContext();
export const MilestoneDispatchContext = createContext();
