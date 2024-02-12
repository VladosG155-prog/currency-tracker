import { ChangeEvent, FC, memo, useCallback } from 'react';

import { IFieldProps } from './Field.interface';

import styles from './Field.module.scss';

export const Field: FC<IFieldProps> = memo(
  ({ value, onChange, placeholder, inputType = 'text', error }) => {
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    }, []);

    return (
      <div data-testid="field" className={styles.field}>
        <p>{placeholder}</p>
        <input
          data-testid="input-field"
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);
