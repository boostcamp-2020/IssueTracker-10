import { createContext } from 'react';

export const initialLabelState = {
  labels: [],
};

export const labelReducer = (state, action) => {
  switch (action.type) {
    case 'GET': {
      const { labels } = action;
      return {
        labels: [...labels, ...state.labels],
      };
    }
    case 'CREATE': {
      const { label } = action;
      return {
        labels: [label, ...state.labels],
      };
    }
    case 'UPDATE': {
      const { label } = action;
      const editLabel = state.labels.map((element) => {
        return element.id === label.id ? label : element;
      });
      return {
        labels: [...editLabel],
      };
    }
    case 'DELETE': {
      return {
        labels: state.labels.filter((label) => label.title !== action.label.title),
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const LabelStateContext = createContext();
export const LabelDispatchContext = createContext();
