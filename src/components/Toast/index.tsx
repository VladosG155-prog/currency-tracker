import { memo, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { observable } from '@root/utils/observer';

import styles from './Toast.module.scss';

export const Toast = memo(() => {
  const [toast, setToast] = useState<string>('');
  const getToast = (data: string) => {
    setToast(data);
  };
  useEffect(() => {
    observable.subscribe(getToast);
    const timeoutId = setTimeout(() => {
      setToast('');
    }, 1500);

    return () => {
      observable.unsubscribe(getToast);
      clearTimeout(timeoutId);
    };
  }, [toast]);

  return toast.length > 0
    ? createPortal(
        <div className={styles.toastContainer}>
          <div className={styles.toast}>
            <p>{toast}</p>
            <span className={styles.toastEnd} />
          </div>
        </div>,
        document.body,
      )
    : null;
});

