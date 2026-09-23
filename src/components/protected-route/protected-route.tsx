import type { ReactElement } from 'react';
import {
  Navigate,
  useLocation
} from 'react-router-dom';

import { Preloader } from '@ui';

import { useSelector } from '../../services/store';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: TProtectedRouteProps): ReactElement => {
  const user = useSelector((state) => state.auth.user);

  const isAuthChecked = useSelector(
    (state) => state.auth.isAuthChecked
  );

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || '/';

    return <Navigate to={from} replace />;
  }

  return children;
};