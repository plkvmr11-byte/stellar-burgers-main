import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';
import { logout } from '../../services/slices/authSlice';

export const ProfileMenu = (): React.JSX.Element => {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(logout()).then((action) => {
      if (logout.fulfilled.match(action)) {
        navigate('/login', {
          replace: true
        });
      }
    });
  };

  return (
    <ProfileMenuUI
      handleLogout={handleLogout}
      pathname={pathname}
    />
  );
};