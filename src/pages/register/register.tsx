import { type SyntheticEvent, useState } from 'react';

import { RegisterUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

import {
  selectAuthError,
  selectAuthLoading
} from '../../services/selectors/authSelectors';

import { register } from '../../services/slices/authSlice';

export const Register = (): React.JSX.Element => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const error = useSelector(selectAuthError);
  const isLoading = useSelector(selectAuthLoading);

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    dispatch(
      register({
        name: userName,
        email,
        password
      })
    );
  };

  return (
    <RegisterUI
      errorText={error ?? ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};