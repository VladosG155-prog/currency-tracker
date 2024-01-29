import React, { FC } from 'react';

import styles from './Field.module.scss';

interface IFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const Field: FC<IFieldProps> = ({ value, onChange, placeholder }) => (
  <div className={styles.field}>
    <p>{placeholder}</p>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default Field;
