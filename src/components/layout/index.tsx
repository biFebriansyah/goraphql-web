import { PropsWithChildren } from 'react';
import { StickyNavbar } from '../Navbar';
import { Provider } from 'urql';
import Sidebars from '../Sidebar';
import useUrql from '../../utils/urqlClient';

const Layouts = ({ children }: PropsWithChildren) => {
  const client = useUrql();

  return (
    <div className="h-screen flex flex-col">
      <StickyNavbar />
      <Provider value={client}>
        <div className="flex flex-row h-full relative overscroll-none overflow-hidden	">
          <Sidebars />
          <main className="w-full h-full flex-4 overflow-y-auto p-10 bg-gray-50 relative">
            {children}
          </main>
        </div>
      </Provider>
    </div>
  );
};

export default Layouts;
