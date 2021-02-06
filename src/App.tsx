import React, { useEffect } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, makeStyles } from '@material-ui/core';

import Nav from './components/Nav/Nav';
import Converter from './components/Converter/Converter';
import Charts from './components/Charts/Charts';

import { fetchCurrenciesNames } from './api';

import { AppState } from './store';
import { setCurrenciesNames } from './store/actions';

interface Names {
  [key: string]: string;
}

interface IProps {
  currenciesNames: Names;
  setCurrenciesNames: (list: Names | undefined) => void;
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '100vw',
    height: 'calc(100vh - 72px)',
    margin: '0 auto',
    backgroundColor: '#3a4253',
  },
});

const App: React.FC<IProps> = ({ currenciesNames, setCurrenciesNames }) => {
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchCurrenciesNames();

      setCurrenciesNames(fetchedData);
    })();
  }, [setCurrenciesNames]);

  return (
    <BrowserRouter>
      <>
        <Nav />
        <Redirect exact from="/" to="/converter" />
        <Container classes={{ root: classes.root }}>
          <Route path="/converter" render={() => (currenciesNames ? <Converter /> : null)} />
          <Route path="/charts" render={() => (currenciesNames ? <Charts /> : null)} />
        </Container>
      </>
    </BrowserRouter>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    currenciesNames: state.currenciesNames,
  };
};

const mapDispatchToProps = {
  setCurrenciesNames,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
