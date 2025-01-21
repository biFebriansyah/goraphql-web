import { Outlet } from 'react-router-dom';
import Layouts from './components/layout';

const App = () => {
  return (
    <Layouts>
      <Outlet />
    </Layouts>
  );
};

export default App;
