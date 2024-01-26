import { FC, useState } from 'react';

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

  const handleChange = (val: string) => {
    onChange(val);
    setIsShowOptions(false);
  };

  const toggleOptions = () => {
    setIsShowOptions((prev) => !prev);
  };

  return (
    <div className={styles.select}>
      <input
        placeholder={placeholder}
        onClick={toggleOptions}
        type="text"
        onChange={() => null}
        value={value}
      />
      {isShowOptions && (
        <div className={styles.options}>
          {options
            .filter((option) => option.value !== value)
            .map((option) => (
              <p onClick={() => handleChange(option.value)}>{option.label}</p>
            ))}
        </div>
      )}
    </div>
  );
};
