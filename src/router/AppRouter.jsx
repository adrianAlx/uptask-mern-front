import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthPublicLayout from '../layouts/AuthPublicLayout';
import { Login, Register } from '../pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPublicLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
