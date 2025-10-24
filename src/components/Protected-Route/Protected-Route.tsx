import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps) => {
  const { user, isAuthChecked } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <div>Проверка авторизации...</div>;
  }

  // Если роут для неавторизованных, но пользователь авторизован
  // Перенаправляем туда, откуда пришли, или на главную
  if (onlyUnAuth && user) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  // Если роут защищенный, но пользователь не авторизован
  // Сохраняем запрашиваемую страницу и перенаправляем на логин
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
