import { FC } from 'react';

import styles from './Field.module.scss';

interface IFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder: string;
  inputType?: 'number' | 'text';
}

export const Field: FC<IFieldProps> = ({
  value,
  onChange,
  placeholder,
  inputType = 'text',
  error,
}) => (
  <div data-testid="field" className={styles.field}>
    <p>{placeholder}</p>
    <input
      data-testid="input-field"
      type={inputType}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

