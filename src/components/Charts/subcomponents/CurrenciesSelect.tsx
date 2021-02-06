import { connect } from 'react-redux';
import { IconButton, makeStyles, TextField } from '@material-ui/core';
import { SwapHoriz } from '@material-ui/icons';

import { AppState } from '../../../store';
import { setFirstCurrencyName, setSecondCurrencyName } from '../../../store/actions';
import { renderCurrenciesNames } from '../../../utils/utils';

interface IProps {
  firstCurrencyName: string;
  setFirstCurrencyName: (name: string) => void;
  secondCurrencyName: string;
  setSecondCurrencyName: (name: string) => void;
  currenciesNames: {
    [key: string]: string;
  };
}

const useStyles = makeStyles({
  selectRoot: {
    width: 200,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#888',
      },
      '&:hover fieldset': {
        borderColor: '#F7B05B',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#F7B05B',
        borderWidth: 1,
      },
    },
    '& .MuiSelect-outlined': {
      fontWeight: 700,
    },
  },
  buttonRoot: {
    color: 'orange',
  },
});

const CurrenciesSelect: React.FC<IProps> = ({
  firstCurrencyName,
  setFirstCurrencyName,
  secondCurrencyName,
  setSecondCurrencyName,
  currenciesNames,
}) => {
  const classes = useStyles();

  const swapCurrencyNames = () => {
    setFirstCurrencyName(secondCurrencyName);
    setSecondCurrencyName(firstCurrencyName);
  };

  return (
    <div>
      <TextField
        select
        value={firstCurrencyName}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setFirstCurrencyName(event.target.value as string);
        }}
        variant="outlined"
        classes={{
          root: classes.selectRoot,
        }}
      >
        {renderCurrenciesNames('first', currenciesNames, firstCurrencyName, secondCurrencyName)}
      </TextField>

      <IconButton onClick={swapCurrencyNames} classes={{ root: classes.buttonRoot }}>
        <SwapHoriz />
      </IconButton>

      <TextField
        select
        value={secondCurrencyName}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setSecondCurrencyName(event.target.value as string);
        }}
        variant="outlined"
        classes={{
          root: classes.selectRoot,
        }}
      >
        {renderCurrenciesNames('second', currenciesNames, firstCurrencyName, secondCurrencyName)}
      </TextField>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    currenciesNames: state.currenciesNames,
    firstCurrencyName: state.firstCurrencyName,
    secondCurrencyName: state.secondCurrencyName,
  };
};

const mapDispatchToProps = {
  setFirstCurrencyName,
  setSecondCurrencyName,
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesSelect);
