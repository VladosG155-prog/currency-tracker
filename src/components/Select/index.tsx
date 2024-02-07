import { FC, useRef, useState } from 'react';
import { useOutsideClick } from '@root/hooks/useClickOutside';
import classNames from 'classnames';

import { Icon } from '../Icon';

import styles from './Select.module.scss';

interface IOption {
  value: string;
  label: string;
}

interface ISelectProps {
  value?: string;
  placeholder?: string;
  onChange: (val: string) => void;
  options: IOption[];
}

export const Select: FC<ISelectProps> = ({
  value = '',
  placeholder = 'Select value',
  options,
  onChange,
}) => {
  const [isShowOptions, setIsShowOptions] = useState(false);
  const ref = useRef(null);

  const handleChange = (val: string) => {
    onChange(val);
    setIsShowOptions(false);
  };

  const toggleOptions = () => {
    setIsShowOptions((prev) => !prev);
  };

  useOutsideClick(ref, toggleOptions);

  return (
    <div className={styles.select}>
      <input
        data-testid="select-input"
        placeholder={placeholder}
        onClick={toggleOptions}
        type="text"
        onChange={() => null}
        value={value}
      />
      <div
        className={classNames(styles.icon, { [styles.active]: isShowOptions })}
      >
        <Icon iconName="angle-down" />
      </div>
      {isShowOptions && (
        <div ref={ref} data-testid="options" className={styles.options}>
          {options
            .filter((option) => option.value !== value)
            .map((option) => (
              <p
                data-testid="select-dropdown-item"
                key={option.label}
                onClick={() => handleChange(option.value)}
              >
                <Icon iconName={option.value} />
                {option.label}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
