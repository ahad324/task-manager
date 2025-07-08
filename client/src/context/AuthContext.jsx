import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, logout } from '../services/authService';
import API from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await API.get('/auth/verify');
          setUser({ token, ...res.data });
        } catch (err) {
          localStorage.removeItem('token');
          console.log(err);
          setUser(null);
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const handleRegister = async (data) => {
    try {
      const res = await register(data);
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token, ...res.data });
      navigate('/tasks');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async (data) => {
    try {
      const res = await login(data);
      localStorage.setItem('token', res.data.token);
      setUser({ token: res.data.token, ...res.data });
      navigate('/tasks');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleRegister, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
