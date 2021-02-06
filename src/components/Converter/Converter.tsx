import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import AmountInput from './subcomponents/AmountInput';
import RatioBox from './subcomponents/RatioBox';
import NameInput from './subcomponents/NameInput';

import { fetchCurrenciesRates } from '../../api';
import { AppState } from '../../store';

interface IProps {
  firstCurrencyName: string;
  secondCurrencyName: string;
}

interface Rates {
  [key: string]: number;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    '& .MuiGrid-container:first-of-type': {
      marginBottom: 10,
    },
  },
});

const Converter: React.FC<IProps> = ({ firstCurrencyName, secondCurrencyName }) => {
  const [firstCurrencyAmount, setFirstCurrencyAmount] = useState<number>(1);
  const [secondCurrencyAmount, setSecondCurrencyAmount] = useState<number>(1);
  const [currenciesRates, setCurrenciesRates] = useState<Rates | undefined>();
  const [activeInput, setActiveInput] = useState<string>('first');

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const fetchedRates = await fetchCurrenciesRates(firstCurrencyName);

      setCurrenciesRates(fetchedRates);
    })();
  }, [firstCurrencyName]);

  useEffect(() => {
    if (currenciesRates) {
      if (activeInput === 'first') {
        const value = parseFloat(
          (firstCurrencyAmount * currenciesRates[secondCurrencyName]).toFixed(2)
        );

        return setSecondCurrencyAmount(value);
      }

      if (activeInput === 'second') {
        let value = parseFloat(
          (secondCurrencyAmount * (1 / currenciesRates[secondCurrencyName])).toFixed(2)
        );

        return setFirstCurrencyAmount(value);
      }
    }
  }, [firstCurrencyAmount, secondCurrencyAmount, secondCurrencyName, currenciesRates, activeInput]);

  return (
    <>
      <Grid container classes={{ root: classes.root }}>
        <Grid item container spacing={4} justify="center" alignItems="center">
          <Grid item>
            <AmountInput
              value={firstCurrencyAmount}
              valueSetter={setFirstCurrencyAmount}
              activeInput="first"
              setActiveInput={setActiveInput}
            />
          </Grid>
          <Grid item>
            <NameInput whichSelect="first" />
          </Grid>
        </Grid>
        <Grid item container spacing={4} justify="center" alignItems="center">
          <Grid item>
            <AmountInput
              value={secondCurrencyAmount}
              valueSetter={setSecondCurrencyAmount}
              activeInput="second"
              setActiveInput={setActiveInput}
            />
          </Grid>
          <Grid item>
            <NameInput whichSelect="second" />
          </Grid>
        </Grid>
      </Grid>

      {currenciesRates ? (
        <RatioBox rates={currenciesRates} />
      ) : (
        <CircularProgress color="secondary" thickness={5} />
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    firstCurrencyName: state.firstCurrencyName,
    secondCurrencyName: state.secondCurrencyName,
  };
};

export default connect(mapStateToProps)(Converter);
