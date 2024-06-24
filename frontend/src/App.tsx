import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CustomToaster from './components/CustomToaster';

// GUARDS
import ProtectedRoute from './features/auth/ProtectedRoute';

// CONTEXTS
import { DarkModeProvider } from './context/DarkModeContext';

// PAGES
import AppLayout from './components/parts/AppLayout';
import Home from './pages/publicPages/Home';
import News from './pages/publicPages/News';
import Movies from './pages/publicPages/Movies';
import IpCidrCalculator from './pages/publicPages/IpCidrCalculator';

import SignupPage from './pages/authPages/SignupPage';
import LoginPage from './pages/authPages/LoginPage';
import ForgetPasswordPage from './pages/authPages/ForgetPasswordPage';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';

import PageNotFound from './pages/PageNotFound';
import PrivacyPolicy from './pages/publicPages/PrivacyPolicy';

//PROTECTED PAGES
import MyAccount from './pages/protectedPages/MyAccount';
import UpdatePasswordPage from './pages/authPages/UpdatePasswordPage';

// CONSTANTS
import { QUERY_DEFAULT_OPTIONS } from './utils/constants';

//TEST
import TestPage from './pages/TestPage';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={new QueryClient(QUERY_DEFAULT_OPTIONS)}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="news" element={<News />} />
              <Route path="movies" element={<Movies />} />
              <Route path="cidr" element={<IpCidrCalculator />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="test" element={<TestPage />} />
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="myAccount"
                element={
                  <ProtectedRoute>
                    <MyAccount />
                  </ProtectedRoute>
                }
              />
              <Route
                path="updatePassword"
                element={
                  <ProtectedRoute>
                    <UpdatePasswordPage />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgetPassword" element={<ForgetPasswordPage />} />
            <Route path="resetPassword/:resetToken" element={<ResetPasswordPage />} />
          </Routes>
        </BrowserRouter>
        <CustomToaster />
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default App;
