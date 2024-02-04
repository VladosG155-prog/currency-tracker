import { FC } from 'react';

import styles from './Field.module.scss';

interface IFieldProps {
  value: string | number;
  onChange: (value: string) => void;
  placeholder: string;
  inputType?: 'number' | 'text';
}

const Field: FC<IFieldProps> = ({
  value,
  onChange,
  placeholder,
  inputType = 'text',
}) => (
  <div data-testid="field" className={styles.field}>
    <p>{placeholder}</p>
    <input
      data-testid="input-field"
      type={inputType}
      value={value}
      min={1}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  </div>
);

export default Field;

