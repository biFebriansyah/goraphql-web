import { useState, ChangeEvent } from 'react';
import { Typography } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { UserSignup } from '@utils/constant';
import useApi from '../../utils/useApi';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const UseApi = useApi('json');
  const Navigate = useNavigate();
  const [signData, setSignData] = useState<UserSignup>({
    name: '',
    email: '',
    password: '',
    admin: false,
  });

  const onInputChange = (el: ChangeEvent<HTMLInputElement>) => {
    const tmpData = { ...signData };
    const elementName = el.target.name as keyof UserSignup;
    tmpData[elementName] = el.target.value;
    setSignData(tmpData);
  };

  const SendData = () => {
    UseApi({ url: 'signup', method: 'POST', data: signData })
      .then(() => {
        Navigate('/signin');
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
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  sign up with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={onInputChange}
                />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
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
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={SendData}
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
                  <span className="ml-3">Sign Up</span>
                </button>
                <Typography variant="small" className="mt-6 flex justify-center">
                  Already have an account?
                  <Link to="/signin">
                    <Typography variant="small" color="blue-gray" className="ml-1 font-bold">
                      Sign in
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
                'url("https://res.cloudinary.com/antikey/image/upload/v1737362898/assets/undraw_well-done_kqud.png")',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
