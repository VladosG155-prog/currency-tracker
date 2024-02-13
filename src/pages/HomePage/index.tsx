import { useEffect, useState } from 'react';
import { CurrencyCard } from '@components/CurrencyCard';
import { Modal } from '@components/Modal';
import { getCurrencies } from '@root/api/currencies';
import { Loader } from '@root/components/Loader';
import { useAppDispatch, useAppSelector } from '@root/store/hooks';
import { toggleModal } from '@root/store/slices/globalSlice';

import { ExchangeModal } from './ExchangeModal';
import { text } from './HomePage.config';

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
  const { modalTitle } = text;
  if (isLoading) return <Loader />;

  return (
    <div data-testid="home-page" className={styles.root}>
      {showModal && (
        <Modal title={modalTitle} onClose={onCloseModal}>
          <ExchangeModal selectedCurrency={selectedCurrency} />
        </Modal>
      )}

      {currencies.map(({ code, value, title }) => (
        <CurrencyCard
          onClick={onClickCard(code)}
          key={code}
          name={code}
          value={value}
          title={title}
        />
      ))}
    </div>
  );
};

export default HomePage;
