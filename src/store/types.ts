export interface CurrenciesGlobalState {
  currenciesNames: {
    [key: string]: string;
  };
  firstCurrencyName: string;
  secondCurrencyName: string;
}

export const SET_CURRENCIES_NAMES = 'SET_CURRENCIES_NAMES';
export const SET_FIRST_CURRENCY_NAME = 'SET_FIRST_CURRENCY_NAME';
export const SET_SECOND_CURRENCY_NAME = 'SET_SECOND_CURRENCY_NAME';

interface SetCurrenciesNames {
  type: typeof SET_CURRENCIES_NAMES;
  currenciesNames: { [key: string]: string };
}

interface SetFirstCurrencyName {
  type: typeof SET_FIRST_CURRENCY_NAME;
  firstCurrencyName: string;
}

interface SetSecondCurrencyName {
  type: typeof SET_SECOND_CURRENCY_NAME;
  secondCurrencyName: string;
}

export type CurrenciesGlobalStateActionTypes =
  | SetCurrenciesNames
  | SetFirstCurrencyName
  | SetSecondCurrencyName;
