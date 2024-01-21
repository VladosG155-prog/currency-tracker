import text from '@constants/text.json';

import styles from './App.module.css';
import Ga from './Ga';

function App() {
  return (
    <>
      {text.shared.header.nav.map((item) => (
        <span>{item}</span>
      ))}
      <Ga />
      <div className={styles.root}>gagas</div>
    </>
  );
}

export default App;
