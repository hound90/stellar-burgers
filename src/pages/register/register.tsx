import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useAppDispatch } from '../../services/hooks';
import { registerUser } from '../../services/userSlice';
import { useNavigate, useLocation } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем запрашиваемую страницу или главную по умолчанию
  const from = location.state?.from || '/';

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Проверяем что все поля заполнены
    if (!userName || !email || !password) {
      setErrorText('Все поля обязательны для заполнения');
      return;
    }

    // Отправляем запрос на регистрацию
    dispatch(registerUser({ name: userName, email, password }))
      .unwrap()
      .then(() => {
        // После успешной регистрации переходим на запрашиваемую страницу
        navigate(from, { replace: true });
      })
      .catch((err) => {
        // Обрабатываем ошибку
        setErrorText(err.message || 'Ошибка регистрации');
      });
  };

  return (
    <RegisterUI
      errorText={errorText}
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
