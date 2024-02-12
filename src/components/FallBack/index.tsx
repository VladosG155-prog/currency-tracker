import { Link } from 'react-router-dom';

import styles from './FallBack.module.scss';

const FallBack = () => (
  <div className={styles.root}>
    <h1>404 - Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <Link to="/">Go back</Link>
  </div>
);

export default FallBack;
