import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { currencyReducer } from './reducer';

export type AppState = ReturnType<typeof currencyReducer>;

export const configureStore = () => {
  const store = createStore(currencyReducer, composeWithDevTools());

  return store;
};
