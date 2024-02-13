import { Link } from 'react-router-dom';
import { routes } from '@root/constants/routes';

import { text } from './FallBack.config';

import styles from './FallBack.module.scss';

const FallBack = () => (
  <div className={styles.root}>
    <h1>{text.title}</h1>
    <p>{text.description}</p>
    <Link to={routes.home}>{text.back}</Link>
  </div>
);

export default FallBack;
