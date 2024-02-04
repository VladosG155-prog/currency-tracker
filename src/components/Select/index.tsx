import { FC, useRef, useState } from 'react';
import { useOutsideClick } from '@root/hooks/useClickOutside';

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
      {isShowOptions && (
        <div data-testid="options" ref={ref} className={styles.options}>
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

