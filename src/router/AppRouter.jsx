import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '../hooks';
import { PublicRoutes } from './PublicRoutes';
import AuthPublicLayout from '../layouts/AuthPublicLayout';
import PrivateLayout from '../layouts/PrivateLayout';
import {
  ConfirmAccount,
  Login,
  NewPassword,
  PasswordRecovery,
  Projects,
  Register,
} from '../pages';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {
  const { authLoading } = useAuth();
  if (authLoading) return;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoutes>
              <AuthPublicLayout />
            </PublicRoutes>
          }
        >
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirm-account/:token" element={<ConfirmAccount />} />
          <Route path="forgot-password" element={<PasswordRecovery />} />
          <Route path="forgot-password/:token" element={<NewPassword />} />
        </Route>

        <Route path="/projects" element={<PrivateLayout />}>
          <Route
            index
            element={
              <PrivateRoutes>
                <Projects />
              </PrivateRoutes>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
