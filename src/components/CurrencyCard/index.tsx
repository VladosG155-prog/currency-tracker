import { FC, memo } from 'react';
import { useMediaQuery } from '@root/hooks/useMediaQuery';
import { Screens } from '@root/types/enums';
import { truncateToTwoSignificantDigits } from '@utils/convertCurrencyValue';

import { Icon } from '../Icon';

import styles from './CurrencyCard.module.scss';

interface ICurrencyCardProps {
  title: string;
  name: string;
  value: number;
  onClick: () => void;
}

export const CurrencyCard: FC<ICurrencyCardProps> = memo(
  ({ name, value, title, onClick }) => {
    const currencyValue = `${truncateToTwoSignificantDigits(1 / value)} BYN`;
    const isTablet = useMediaQuery(Screens.Tablet);
    return (
      <div
        data-testid="currency-card"
        onClick={onClick}
        className={styles.root}
      >
        <Icon
          iconName={name}
          width={isTablet ? 30 : 80}
          height={isTablet ? 30 : 80}
        />
        <div className={styles.text}>
          <h3>{title}</h3>
          <p>{currencyValue}</p>
        </div>
      </div>
    );
  },
);
