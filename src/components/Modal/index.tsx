import { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '@root/hooks/useClickOutside';

import { IModalProps } from './Modal.interface';

import styles from './Modal.module.scss';

export const Modal: FC<IModalProps> = ({ onClose, title, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, onClose);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = 'unset';
    };
  }, []);

  return createPortal(
    <div data-testid="modal" className={styles.overlay}>
      <div ref={ref} className={styles.root}>
        <h2>{title}</h2>
        <button type="button" className={styles.close} onClick={onClose}>
          &times;
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};
