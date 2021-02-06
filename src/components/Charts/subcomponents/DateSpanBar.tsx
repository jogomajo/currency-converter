import React, { useState } from 'react';
import { Tab, Tabs, makeStyles, withStyles } from '@material-ui/core';

interface IProps {
  setDateSpan: (span: number) => void;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: '#434C60',
  },
  indicator: {
    backgroundColor: '#B7BECD',
  },
});

const MyTab = withStyles({
  root: {
    color: '#aaa',
  },
  selected: {
    color: '#B7BECD',
  },
})(Tab);

const DateSpanBar: React.FC<IProps> = ({ setDateSpan }) => {
  const [spanSelectActive, setSpanSelectActive] = useState(3);

  const classes = useStyles();

  return (
    <Tabs
      classes={{
        root: classes.root,
        indicator: classes.indicator,
      }}
      value={spanSelectActive}
      onChange={(event: React.ChangeEvent<{}>, newValue: number) => {
        setSpanSelectActive(newValue);
      }}
    >
      <MyTab label="1 month" onClick={() => setDateSpan(1)} />
      <MyTab label="3 months" onClick={() => setDateSpan(3)} />
      <MyTab label="6 months" onClick={() => setDateSpan(6)} />
      <MyTab label="1 year" onClick={() => setDateSpan(12)} />
      <MyTab label="5 years" onClick={() => setDateSpan(50)} />
    </Tabs>
  );
};

export default DateSpanBar;
