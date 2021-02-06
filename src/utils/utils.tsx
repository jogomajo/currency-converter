import { MenuItem } from '@material-ui/core';

export const renderCurrenciesNames = (
  whichSelect: string,
  currenciesNames: {
    [key: string]: string;
  },
  firstCurrencyName: string,
  secondCurrencyName: string
) => {
  let names = Object.entries(currenciesNames);

  if (whichSelect === 'first') names = names.filter((name) => name[0] !== secondCurrencyName);
  if (whichSelect === 'second') names = names.filter((name) => name[0] !== firstCurrencyName);

  return names.map((name) => (
    <MenuItem key={name[1]} value={name[0]}>
      {name[1]}
    </MenuItem>
  ));
};
