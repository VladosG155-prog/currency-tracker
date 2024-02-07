import { Outlet } from 'react-router-dom';

import { Footer } from './components/Footer';
import Header from './components/Header';

import './styles/index.scss';
import styles from './App.module.scss';

const App = () => (
  <div className={styles.container}>
    <Header />
    <Outlet />
    <Footer />
  </div>
);
export default App;

