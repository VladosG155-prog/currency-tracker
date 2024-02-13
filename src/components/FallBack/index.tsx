import { Link } from 'react-router-dom';
import { routes } from '@root/constants/routes';

import { text } from './FallBack.config';

import styles from './FallBack.module.scss';

const FallBack = () => {
  const { title, description, back } = text;
  const { home } = routes;
  return (
    <div className={styles.root}>
      <h1>{title}</h1>
      <p>{description}</p>
      <Link to={home}>{back}</Link>
    </div>
  );
};

export default FallBack;
