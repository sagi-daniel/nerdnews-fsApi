import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from 'react-hot-toast';

// CONTEXTS
import { DarkModeProvider } from './context/DarkModeContext';
// import { AuthProvider } from './context/AuthContext';

// COMPONENTS
import AppLayout from './components/parts/AppLayout';
import Home from './pages/Home';
import News from './pages/News';
import Movies from './pages/Movies';
import IpCidrCalculator from './pages/IpCidrCalculator';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import MyAccount from './pages/MyAccount';

import PageNotFound from './pages/PageNotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';

// CONSTANTS
import { QUERY_DEFAULT_OPTIONS } from './utils/constants';
import ProtectedRoute from './features/auth/ProtectedRoute';

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
              <Route path="*" element={<PageNotFound />} />
              <Route
                path="myAccount"
                element={
                  <ProtectedRoute>
                    <MyAccount />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)',
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default App;
