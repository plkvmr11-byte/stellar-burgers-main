import { type ChangeEvent, type SyntheticEvent, useEffect, useState } from 'react';

import { ProfileUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';

import {
  selectAuthError,
  selectUser
} from '../../services/selectors/authSelectors';

import { updateUser } from '../../services/slices/authSlice';

export const Profile = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectAuthError);

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  useEffect(() => {
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name ?? '') ||
    formValue.email !== (user?.email ?? '') ||
    formValue.password !== '';

  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();

    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        password: formValue.password || undefined
      })
    );
  };

  const handleCancel = (e: SyntheticEvent): void => {
    e.preventDefault();

    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: ''
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError ?? ''}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};