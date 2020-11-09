import { createContext } from 'react';

export const initialIssueState = {
  filter: {
    state: 'open',
    author: null,
    label: [],
    milestones: null,
    assignees: null,
  },
  issues: [],
  openCount: 0,
  closedCount: 0,
};

export const issueReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_HEADER': {
      const { openCount, closedCount } = action.payload;
      return {
        ...state,
        openCount,
        closedCount,
      };
    }
    case 'FETCH_ISSUES': {
      return {
        ...state,
        issues: [...action.payload],
      };
    }
    case 'OPEN': {
      return {
        ...state,
        filter: {
          ...state.filter,
          state: 'open',
        },
        issues: [...action.payload],
      };
    }
    case 'CLOSE': {
      return {
        ...state,
        filter: {
          ...state.filter,
          state: 'closed',
        },
        issues: [...action.payload],
      };
    }
    case 'ALL': {
      return {
        ...state,
        filter: {
          ...state.filter,
          state: 'all',
        },
        issues: [...action.payload],
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const IssueStateContext = createContext();
export const IssueDispatchContext = createContext();