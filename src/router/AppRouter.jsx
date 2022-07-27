import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks';
import AuthPublicLayout from '../layouts/AuthPublicLayout';
import {
  ConfirmAccount,
  Login,
  NewPassword,
  PasswordRecovery,
  Register,
} from '../pages';

export const AppRouter = () => {
  const { authLoading } = useAuth();
  if (authLoading) return;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPublicLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="forgot-password" element={<PasswordRecovery />} />
          <Route path="forgot-password/:token" element={<NewPassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
