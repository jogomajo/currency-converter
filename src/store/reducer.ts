import {
  CurrenciesGlobalState,
  CurrenciesGlobalStateActionTypes,
  SET_CURRENCIES_NAMES,
  SET_FIRST_CURRENCY_NAME,
  SET_SECOND_CURRENCY_NAME,
} from './types';

const initialState: CurrenciesGlobalState = {
  currenciesNames: {
    USD: 'United States Dollar',
    EUR: 'Euro',
  },
  firstCurrencyName: 'USD',
  secondCurrencyName: 'EUR',
};

export const currencyReducer = (state = initialState, action: CurrenciesGlobalStateActionTypes) => {
  switch (action.type) {
    case SET_CURRENCIES_NAMES:
      return {
        ...state,
        currenciesNames: action.currenciesNames,
      };
    case SET_FIRST_CURRENCY_NAME:
      return {
        ...state,
        firstCurrencyName: action.firstCurrencyName,
      };
    case SET_SECOND_CURRENCY_NAME:
      return {
        ...state,
        secondCurrencyName: action.secondCurrencyName,
      };
    default:
      return state;
  }
};
