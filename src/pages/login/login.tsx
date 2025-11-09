import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch } from '../../services/hooks';
import { loginUser } from '../../services/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем запрашиваемую страницу или главную по умолчанию
  const from = location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Проверяем что все поля заполнены
    if (!email || !password) {
      setErrorText('Все поля обязательны для заполнения');
      return;
    }

    // Отправляем запрос на авторизацию
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        // После успешной авторизации переходим на запрашиваемую страницу
        navigate(from, { replace: true });
      })
      .catch((err) => {
        // Обрабатываем ошибку
        setErrorText(err.message || 'Ошибка авторизации');
      });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
