import { useEffect, useState } from 'react';
import { CurrencyCard } from '@components/CurrencyCard';
import { Modal } from '@components/Modal';
import text from '@constants/text.json';
import { getCurrencies } from '@root/api/currencies';
import { Loader } from '@root/components/Loader';
import { useAppDispatch, useAppSelector } from '@root/store/hooks';
import { toggleModal } from '@root/store/slices/globalSlice';

import { ExchangeModal } from './ExchangeModal';

import styles from './HomePage.module.scss';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { currencies, isLoading } = useAppSelector((state) => state.currency);
  const showModal = useAppSelector((state) => state.global.showModal);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const onClickCard = (currencyCode: string) => () => {
    dispatch(toggleModal());
    setSelectedCurrency(currencyCode);
  };

  const onCloseModal = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    dispatch(getCurrencies());
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div data-testid="home-page" className={styles.root}>
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
          onClick={onClickCard(currency.code)}
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
