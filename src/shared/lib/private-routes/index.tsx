import { Outlet } from 'react-router-dom';
// import { getToken } from '..';

export const PrivateRoutes = () => {
  // const token = getToken();
  // if (!token) return <Navigate to={"/login"} />;
  return <Outlet />;
};
