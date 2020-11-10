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
  checkedIds: [],
};

export const issueReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_ISSUES': {
      const { issues, openCount, closedCount } = action.payload;
      return {
        ...state,
        issues,
        openCount,
        closedCount,
      };
    }
    case 'OPEN': {
      return {
        ...state,
        filter: {
          ...state.filter,
          state: 'open',
        },
      };
    }
    case 'CLOSE': {
      return {
        ...state,
        filter: {
          ...state.filter,
          state: 'closed',
        },
      };
    }
    case 'ALL': {
      return {
        ...state,
        filter: {
          ...state.filter,
          state: 'all',
        },
      };
    }
    case 'SET_AUTHOR': {
      return {
        ...state,
        filter: {
          ...state.filter,
          author: action.id,
        },
      };
    }
    case 'REMOVE_AUTHOR': {
      return {
        ...state,
        filter: {
          ...state.filter,
          author: null,
        },
      };
    }
    case 'SET_ONE_LABEL': {
      return {
        ...state,
        filter: {
          ...state.filter,
          label: [action.id],
        },
      };
    }
    case 'SET_ASSIGNEE': {
      return {
        ...state,
        filter: {
          ...state.filter,
          assignee: action.id,
        },
      };
    }
    case 'REMOVE_ASSIGNEE': {
      return {
        ...state,
        filter: {
          ...state.filter,
          assignee: null,
        },
      };
    }
    case 'RESET_FILTER': {
      return {
        ...state,
        filter: {
          state: 'open',
          author: null,
          label: [],
          milestones: null,
          assignees: null,
        },
        checkedIds: [],
      };
    }
    case 'STORE_DETAIL_DATA': {
      const { users, labels, milestones } = action.payload;
      return {
        ...state,
        assignees: [...users],
        labels: [...labels],
        milestones: [...milestones],
      };
    }
    case 'CHECK_ISSUE': {
      return {
        ...state,
        checkedIds: [...state.checkedIds, action.id],
      };
    }
    case 'CHECK_ALL_ISSUE': {
      return {
        ...state,
        checkedIds: [...action.ids],
      };
    }
    case 'UNCHECK_ISSUE': {
      return {
        ...state,
        checkedIds: state.checkedIds.filter((id) => id !== action.id),
      };
    }
    case 'UNCHECK_ALL_ISSUE': {
      return {
        ...state,
        checkedIds: [],
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const IssueStateContext = createContext();
export const IssueDispatchContext = createContext();
