import { FC, useEffect, useState } from 'react';
import Field from '@components/Field';
import { Select } from '@components/Select';
import { useAppDispatch, useAppSelector } from '@root/store/hooks';
import { exchangeRate } from '@root/store/slices/currencySlice';
import { truncateToTwoSignificantDigits } from '@root/utils/convertCurrencyValue';

import styles from './ExchangeModal.module.scss';

interface ISelectedCurrency {
  selectedCurrency: string;
}

export const ExchangeModal: FC<ISelectedCurrency> = ({ selectedCurrency }) => {
  const currencies = useAppSelector((state) => state.currency.currencies);
  const currenciesRate = useAppSelector((state) => state.currency.rate);
  const dispatch = useAppDispatch();

  const [activeCurrency, setActiveCurrency] = useState('');
  const [selectedCurrencyRate, setSelectedCurrencyRate] = useState(1);
  const [activeCurrencyRate, setActiveCurrencyRate] = useState(1);

  const options = currencies
    .map((currency) => {
      const newObj = { label: currency.title, value: currency.code };
      return newObj;
    })
    .filter((currency) => currency.value !== selectedCurrency);

  const handleChangeCurrency = (val: string) => {
    setActiveCurrency(val);

    setActiveCurrencyRate(selectedCurrencyRate * currenciesRate);
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

  const handleChangeSelectedCurrency = (val: number) => {
    setSelectedCurrencyRate(val);
  };

  return (
    <>
      <Field
        placeholder={selectedCurrency}
        value={truncateToTwoSignificantDigits(selectedCurrencyRate)}
        onChange={(val) => handleChangeSelectedCurrency(+val)}
        inputType="number"
      />
      <div className={styles.select}>
        <Select
          onChange={handleChangeCurrency}
          value={activeCurrency}
          options={options}
        />
      </div>
      <p data-testid="convert-to" className={styles.convertedTo}>
        {selectedCurrencyRate &&
          activeCurrency &&
          truncateToTwoSignificantDigits(activeCurrencyRate)}
      </p>
    </>
  );
};

