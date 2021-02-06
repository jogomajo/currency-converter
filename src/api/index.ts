import axios from 'axios';
import dayjs from 'dayjs';

const URL = 'https://api.frankfurter.app/';

interface Names {
  [key: string]: string;
}

interface Rates {
  [key: string]: number;
}

interface TimeSeries {
  date: string;
  rate: number;
}

interface TimeSeriesRates {
  data: {
    rates: {
      date: {
        [currencyName: string]: number;
      };
    };
  };
}

export const fetchCurrenciesNames = async (): Promise<Names | undefined> => {
  try {
    const { data }: { data: Names } = await axios.get(`${URL}/currencies`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCurrenciesRates = async (name: string): Promise<Rates | undefined> => {
  try {
    const {
      data: { rates },
    }: { data: { rates: Rates } } = await axios.get(`${URL}/latest?from=${name}`);

    return rates;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTimeSeries = async (
  firstCurrency: string,
  secondCurrency: string,
  span: number
): Promise<TimeSeries[] | undefined> => {
  try {
    const {
      data: { rates },
    }: TimeSeriesRates = await axios.get(
      `${URL}/${calculateStartDate(span)}..?from=${firstCurrency}`
    );

    const modifiedRates: TimeSeries[] = Object.entries(rates).map((data) => ({
      date: data[0],
      rate: data[1][secondCurrency],
    }));

    return modifiedRates;
  } catch (error) {
    console.log(error);
  }
};

const calculateStartDate = (span: number) => {
  const now = dayjs();

  const year = now.subtract(span, 'month').year();
  let month: number | string = now.subtract(span, 'month').month() + 1;
  let day: number | string = now.subtract(span, 'month').date();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  return `${year}-${month}-${day}`;
};
