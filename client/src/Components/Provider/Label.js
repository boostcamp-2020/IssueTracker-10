import React, { useReducer } from 'react';
import {
  LabelStateContext,
  LabelDispatchContext,
  initialLabelState,
  labelReducer,
} from '../../Context/LabelContext';

export default ({ children }) => {
  const [state, dispatch] = useReducer(labelReducer, initialLabelState);
  return (
    <LabelStateContext.Provider value={state}>
      <LabelDispatchContext.Provider value={dispatch}>{children}</LabelDispatchContext.Provider>
    </LabelStateContext.Provider>
  );
};
