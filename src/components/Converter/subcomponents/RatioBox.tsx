import React from 'react';
import { connect } from 'react-redux';
import { Typography, Paper, makeStyles } from '@material-ui/core';

import { AppState } from '../../../store';

interface IProps {
  firstCurrencyAbbreviation: string;
  secondCurrencyAbbreviation: string;
  rates: { [key: string]: number };
}

const useStyles = makeStyles({
  paperRoot: {
    backgroundColor: '#3a4253',
    marginTop: 200,
    padding: '40px 60px',
  },
  typographyRoot: {
    color: '#F7B05B',
    '&:first-child': {
      marginBottom: 20,
    },
  },
});

const RatioBox: React.FC<IProps> = ({
  firstCurrencyAbbreviation,
  secondCurrencyAbbreviation,
  rates,
}) => {
  const classes = useStyles();

  const firstPairRate = () => rates[secondCurrencyAbbreviation].toFixed(4);
  const secondPairRate = () => (1 / rates[secondCurrencyAbbreviation]).toFixed(4);

  return (
    <Paper elevation={3} variant="elevation" classes={{ root: classes.paperRoot }}>
      <Typography
        variant="h5"
        align="center"
        classes={{ root: classes.typographyRoot }}
      >{`1 ${firstCurrencyAbbreviation} = ${firstPairRate()} ${secondCurrencyAbbreviation}`}</Typography>
      <Typography
        variant="h5"
        align="center"
        classes={{ root: classes.typographyRoot }}
      >{`1 ${secondCurrencyAbbreviation} = ${secondPairRate()} ${firstCurrencyAbbreviation}`}</Typography>
    </Paper>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    firstCurrencyAbbreviation: state.firstCurrencyName,
    secondCurrencyAbbreviation: state.secondCurrencyName,
  };
};

export default connect(mapStateToProps)(RatioBox);
