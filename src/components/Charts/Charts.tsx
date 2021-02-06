import React, { useEffect, useState } from 'react';
import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';

import DateSpanBar from './subcomponents/DateSpanBar';
import CurrenciesSelect from './subcomponents/CurrenciesSelect';

import { fetchTimeSeries } from '../../api';
import { AppState } from '../../store';

interface IProps {
  firstCurrencyName: string;
  secondCurrencyName: string;
}

interface TimeSeries {
  date: string;
  rate: number;
}

const useStyles = makeStyles({
  containerRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 72px)',
    maxWidth: 1000,
    margin: '0 auto',
  },
  chartWrapperRoot: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    margin: '5vh 0 8vh 0',
  },
});

const Charts: React.FC<IProps> = ({ firstCurrencyName, secondCurrencyName }) => {
  const [dataSeries, setDataSeries] = useState<TimeSeries[]>();
  const [dateSpan, setDateSpan] = useState(12);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      const fetchedDataSeries = await fetchTimeSeries(
        firstCurrencyName,
        secondCurrencyName,
        dateSpan
      );

      setDataSeries(fetchedDataSeries);
    })();
  }, [firstCurrencyName, secondCurrencyName, dateSpan]);

  const chart = () => {
    return dataSeries ? (
      <Line
        data={{
          labels: dataSeries.map((data: TimeSeries) => data.date),
          datasets: [
            {
              data: dataSeries.map((data: TimeSeries) => data.rate),
              label: 'Ratio',
              borderColor: '#EFA00B',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              fill: true,
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: `${firstCurrencyName} to ${secondCurrencyName} chart`,
            fontSize: 24,
            fontColor: '#999',
          },
          legend: {
            display: false,
          },
          tooltips: {
            mode: 'nearest',
            intersect: false,
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  maxTicksLimit: 10,
                  labelOffset: 25,
                  maxRotation: 25,
                  fontColor: '#999',
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: '#999',
                },
              },
            ],
          },
        }}
      ></Line>
    ) : (
      <CircularProgress color="secondary" size={80} />
    );
  };

  return (
    <Container classes={{ root: classes.containerRoot }}>
      <DateSpanBar setDateSpan={setDateSpan} />

      <Container classes={{ root: classes.chartWrapperRoot }}>{chart()}</Container>

      <CurrenciesSelect />
    </Container>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    firstCurrencyName: state.firstCurrencyName,
    secondCurrencyName: state.secondCurrencyName,
  };
};

export default connect(mapStateToProps)(Charts);
