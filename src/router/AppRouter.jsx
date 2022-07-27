import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AuthPublicLayout from '../layouts/AuthPublicLayout';
import { Login } from '../pages';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPublicLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
