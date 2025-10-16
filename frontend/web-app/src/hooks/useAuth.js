import { useSelector, useDispatch } from 'react-redux';
import { login, signup, logout } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, status, error } = useSelector((state) => state.auth);

  return {
    user,
    token,
    isAuthenticated,
    status,
    error,
    login: (credentials) => dispatch(login(credentials)),
    signup: (userInfo) => dispatch(signup(userInfo)),
    logout: () => dispatch(logout()),
  };
};
