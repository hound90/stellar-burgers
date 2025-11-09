import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../services/hooks';
import { updateUser } from '../../services/userSlice';

export const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isFormChanged) {
      // Отправляем только измененные данные
      const updateData: { name?: string; email?: string; password?: string } =
        {};
      if (formValue.name !== user?.name) updateData.name = formValue.name;
      if (formValue.email !== user?.email) updateData.email = formValue.email;
      if (formValue.password) updateData.password = formValue.password;

      dispatch(updateUser(updateData))
        .unwrap()
        .then(() => {
          setIsEditing(false);
          setFormValue((prev) => ({ ...prev, password: '' })); // очищаем пароль
        })
        .catch((error) => {
          console.error('Update error:', error);
        });
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged || isEditing}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
