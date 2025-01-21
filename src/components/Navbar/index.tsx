import { Navbar, Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { setToken } from '@utils/recoilState';

export function StickyNavbar() {
  const [token, setTokens] = useRecoilState(setToken);

  const setLogout = () => {
    if (token) {
      setTokens('');
    }
  };

  return (
    <div className="overscroll-non bg-white">
      <Navbar color="white" className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="flex items-center justify-center lg:w-[11%]">
            <Typography as="a" href="/" className="cursor-pointer py-1.5 font-medium">
              Goraph-QL
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-x-1">
              {!token ? (
                <>
                  <Link to="/signin">
                    <Button variant="text" size="sm" className="hidden lg:inline-block">
                      <span>Log In</span>
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                      <span>Sign in</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={setLogout}
                >
                  <span>Logout</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
}
