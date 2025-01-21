import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { setToken } from '@utils/recoilState';
import { UserSignin } from '@utils/constant';
import useApi from '../../utils/useApi';

function Signin() {
  const UseApi = useApi('json');
  const Navigate = useNavigate();
  const [signData, setSignData] = useState<UserSignin>({
    email: '',
    password: '',
  });

  const [token, setTokens] = useRecoilState(setToken);
  useEffect(() => {
    if (token) {
      Navigate('/');
    }
  }, [token]);

  const onInputChange = (el: ChangeEvent<HTMLInputElement>) => {
    const tmpData = { ...signData };
    const elementName = el.target.name as keyof UserSignin;
    tmpData[elementName] = el.target.value;
    setSignData(tmpData);
  };

  const SendData = () => {
    UseApi({ url: 'signin', method: 'POST', data: signData })
      .then(({ data }) => {
        setTokens(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-12 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  sign in with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={onInputChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={onInputChange}
                />
                <button
                  onClick={SendData}
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy={7} r={4} />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign In</span>
                </button>
                <Typography variant="small" className="mt-6 flex justify-center">
                  Don&apos;t have an account?
                  <Link to="/signup">
                    <Typography variant="small" color="blue-gray" className="ml-1 font-bold">
                      Sign up
                    </Typography>
                  </Link>
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                'url("https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
