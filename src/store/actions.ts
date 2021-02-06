import { SET_CURRENCIES_NAMES, SET_FIRST_CURRENCY_NAME, SET_SECOND_CURRENCY_NAME } from './types';

export const setCurrenciesNames = (currenciesNames: { [key: string]: string } | undefined) => {
  return {
    type: SET_CURRENCIES_NAMES,
    currenciesNames,
  };
};

export const setFirstCurrencyName = (firstCurrencyName: string) => {
  return {
    type: SET_FIRST_CURRENCY_NAME,
    firstCurrencyName,
  };
};

export const setSecondCurrencyName = (secondCurrencyName: string) => {
  return {
    type: SET_SECOND_CURRENCY_NAME,
    secondCurrencyName,
  };
};
