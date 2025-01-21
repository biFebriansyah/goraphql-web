import { Navigate } from 'react-router-dom';
import { FC, ComponentType } from 'react';
import { useRecoilValue } from 'recoil';
import { getToken } from './recoilState';

const withAuth = <P extends object>(Component: ComponentType<P>): FC<P> => {
  return (props: P) => {
    const isAuth = useRecoilValue(getToken);
    if (!isAuth) {
      return <Navigate to="/signin" />;
    }

    return <Component {...props} />;
  };
};

export default withAuth;
