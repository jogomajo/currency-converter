import { TextField, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import { AppState } from '../../../store';
import { setFirstCurrencyName, setSecondCurrencyName } from '../../../store/actions';
import { renderCurrenciesNames } from '../../../utils/utils';

interface IProps {
  whichSelect: string;
  currenciesNames: {
    [key: string]: string;
  };
  firstCurrencyName: string;
  setFirstCurrencyName: (name: string) => void;
  secondCurrencyName: string;
  setSecondCurrencyName: (name: string) => void;
}

const useStyles = makeStyles({
  root: {
    '& label': {
      color: '#ddd',
    },
    '&:hover label': {
      color: '#F7B05B',
    },
    '& label.Mui-focused': {
      color: '#F7B05B',
    },
    '& .MuiOutlinedInput-root': {
      width: 200,
      height: 65.5,
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
});

const NameInput: React.FC<IProps> = ({
  whichSelect,
  currenciesNames,
  firstCurrencyName,
  setFirstCurrencyName,
  secondCurrencyName,
  setSecondCurrencyName,
}) => {
  const classes = useStyles();

  const onChangeCurrencyNameHandler = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (whichSelect === 'first') {
      setFirstCurrencyName(event.target.value as string);
    } else {
      setSecondCurrencyName(event.target.value as string);
    }
  };

  return (
    <TextField
      select
      label="name"
      value={whichSelect === 'first' ? firstCurrencyName : secondCurrencyName}
      onChange={(event) => {
        onChangeCurrencyNameHandler(event);
      }}
      variant="outlined"
      classes={{
        root: classes.root,
      }}
    >
      {renderCurrenciesNames(whichSelect, currenciesNames, firstCurrencyName, secondCurrencyName)}
    </TextField>
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

export default connect(mapStateToProps, mapDispatchToProps)(NameInput);
