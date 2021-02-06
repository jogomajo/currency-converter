import { TextField, makeStyles } from '@material-ui/core';

interface IProps {
  value: number;
  valueSetter: (value: number) => void;
  activeInput: string;
  setActiveInput: (value: string) => void;
}

const useStyles = makeStyles({
  root: {
    '& label': {
      color: '#ddd',
    },
    '& input': {
      fontWeight: 700,
      fontSize: 24,
    },
    '&:hover label': {
      color: '#F7B05B',
    },
    '& label.Mui-focused': {
      color: '#F7B05B',
    },
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
});

const AmountInput: React.FC<IProps> = ({ value, valueSetter, activeInput, setActiveInput }) => {
  const classes = useStyles();

  const validateAmount = (value: number, setAmount: (value: number) => void) => {
    if (value < 0 || value.toString().startsWith('0')) return;

    setAmount(value);
  };

  return (
    <TextField
      id={`${activeInput}-currency-amount`}
      label="amount"
      variant="outlined"
      type="number"
      onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
        validateAmount(event.target.value as number, valueSetter);
        setActiveInput(activeInput);
      }}
      value={value}
      size="medium"
      classes={{
        root: classes.root,
      }}
    />
  );
};

export default AmountInput;
