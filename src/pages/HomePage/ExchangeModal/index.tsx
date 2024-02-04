import { FC, useEffect, useState } from 'react';
import { Field } from '@components/Field';
import { Select } from '@components/Select';
import { useAppDispatch, useAppSelector } from '@root/store/hooks';
import { exchangeRate } from '@root/store/slices/currencySlice';
import { truncateToTwoSignificantDigits } from '@root/utils/convertCurrencyValue';
import { optionsMapper } from '@root/utils/optionsMapper';
import { validationNumber } from '@root/utils/validation';

import styles from './ExchangeModal.module.scss';

interface ISelectedCurrency {
  selectedCurrency: string;
}

export const ExchangeModal: FC<ISelectedCurrency> = ({ selectedCurrency }) => {
  const currencies = useAppSelector((state) => state.currency.currencies);
  const currenciesRate = useAppSelector((state) => state.currency.rate);
  const dispatch = useAppDispatch();

  const [activeCurrency, setActiveCurrency] = useState('');
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState('1');
  const [activeCurrencyRate, setActiveCurrencyRate] = useState(1);

  const options = currencies
    .map(optionsMapper)
    .filter((currency) => currency.value !== selectedCurrency);

  const handleChangeCurrency = (val: string) => {
    setActiveCurrency(val);
  };

  useEffect(() => {
    dispatch(
      exchangeRate({
        activeCurrency,
        selectedCurrency,
      }),
    );
  }, [selectedCurrency, activeCurrency]);

  useEffect(() => {
    setActiveCurrencyRate(+selectedCurrencyRate * currenciesRate);
  }, [currenciesRate, selectedCurrencyRate]);

  const handleChangeSelectedCurrency = (val: string) => {
    setSelectedCurrencyRate(val);
  };

  const error = validationNumber(+selectedCurrencyRate, 1, 10000);

  const isShowConvertedCurrency =
    activeCurrency &&
    !error &&
    `${truncateToTwoSignificantDigits(activeCurrencyRate)}  ${activeCurrency}`;

  return (
    <>
      <Field
        placeholder={selectedCurrency}
        value={selectedCurrencyRate}
        onChange={(val) => handleChangeSelectedCurrency(val)}
        inputType="number"
        error={error}
      />
      <div className={styles.select}>
        <Select
          onChange={handleChangeCurrency}
          value={activeCurrency}
          options={options}
        />
      </div>
      <p data-testid="convert-to" className={styles.convertedTo}>
        {isShowConvertedCurrency}
      </p>
    </>
  );
};

