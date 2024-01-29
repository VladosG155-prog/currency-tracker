import { FC, useEffect, useState } from 'react';
import Field from '@root/components/Field';
import { Select } from '@root/components/Select';
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

  const handleUsdInputChange = (val: string) => {
    setActiveCurrencyRate(+val);
    setSelectedCurrencyRate(+val * currenciesRate);
  };

  const handleBynInputChange = (val: string) => {
    setSelectedCurrencyRate(+val);
    setActiveCurrencyRate(+val / currenciesRate);
  };

  const handleChangeCurrency = (currency: string) => {
    setActiveCurrency(currency);
    setActiveCurrencyRate(currenciesRate);
  };

  console.log(currenciesRate);

  const options = currencies
    .map((currency) => {
      const newObj = { label: currency.title, value: currency.code };
      return newObj;
    })
    .filter((currency) => currency.value !== selectedCurrency);

  useEffect(() => {
    dispatch(
      exchangeRate({
        exchangeCurrency: activeCurrency,
        selectedCurrency,
      }),
    );
  }, [selectedCurrency, activeCurrency]);

  return (
    <>
      <Field
        placeholder={selectedCurrency}
        value={String(truncateToTwoSignificantDigits(selectedCurrencyRate))}
        onChange={(val) => handleUsdInputChange(val)}
      />
      <div className={styles.select}>
        <Select
          onChange={handleChangeCurrency}
          value={activeCurrency}
          options={options}
        />
      </div>
      {activeCurrency && (
        <Field
          placeholder={activeCurrency}
          value={String(truncateToTwoSignificantDigits(activeCurrencyRate))}
          onChange={(str) => handleBynInputChange(str)}
        />
      )}
    </>
  );
};

