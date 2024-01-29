import { useEffect, useState } from 'react';
import CurrencyCard from '@components/CurrencyCard';
import Modal from '@components/Modal';
import text from '@constants/text.json';
import { useAppDispatch, useAppSelector } from '@root/store/hooks';
import { getCurrencies } from '@root/store/slices/currencySlice';
import { toggleModal } from '@root/store/slices/globalSlice';

import { ExchangeModal } from './ExchangeModal';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector((state) => state.currency.currencies);
  const showModal = useAppSelector((state) => state.global.showModal);

  const [selectedCurrency, setSelectedCurrency] = useState('');

  const onClickCard = (currencyCode: string) => {
    dispatch(toggleModal());
    setSelectedCurrency(currencyCode);
  };

  const onCloseModal = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  return (
    <div className={styles.root}>
      {showModal && (
        <Modal
          title={text.shared.modals.convertCurrency}
          onClose={onCloseModal}
        >
          <ExchangeModal selectedCurrency={selectedCurrency} />
        </Modal>
      )}
      {currencies.map((currency) => (
        <CurrencyCard
          onClick={() => onClickCard(currency.code)}
          key={currency.code}
          name={currency.code}
          value={currency.value}
          title={currency.title}
        />
      ))}
    </div>
  );
};

export default HomePage;
