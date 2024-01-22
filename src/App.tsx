import './styles/index.scss';

import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>header</header>
      <Outlet />
      <footer />
    </div>
  );
}
export default App;
