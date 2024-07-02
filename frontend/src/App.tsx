import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CustomToaster from './components/CustomToaster';

// GUARDS
import ProtectedRoute from './features/auth/ProtectedRoute';

// CONTEXTS
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
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

import ForgetPasswordConfirm from './pages/authPages/ForgetPasswordConfirm';

import PrivacyPolicy from './pages/publicPages/PrivacyPolicy';
import PageNotFound from './pages/PageNotFound';
import Forbidden from './pages/Forbidden';

//PROTECTED PAGES
//USER PRIVILEGE
import MyAccount from './pages/protectedPages/MyAccount';
import MyNews from './pages/protectedPages/MyNews';
import MyMovies from './pages/protectedPages/MyMovies';
import UpdatePasswordPage from './pages/authPages/UpdatePasswordPage';
//ADMIN PIRIVLEGE
import Users from './pages/protectedPages/Users';
import Categories from './pages/protectedPages/Categories';
import Sources from './pages/protectedPages/Sources';

// CONSTANTS
import { QUERY_DEFAULT_OPTIONS } from './utils/constants';

//TEST
import TestPage from './pages/TestPage';

function App() {
  return (
    <QueryClientProvider client={new QueryClient(QUERY_DEFAULT_OPTIONS)}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DarkModeProvider>
        <BrowserRouter>
          <AuthProvider>
            <UserProvider>
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
                    path="myNews"
                    element={
                      <ProtectedRoute>
                        <MyNews />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="myMovies"
                    element={
                      <ProtectedRoute>
                        <MyMovies />
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
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="categories"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Categories />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="sources"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Sources />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="signup" element={<SignupPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="forgetPassword" element={<ForgetPasswordPage />} />
                  <Route path="forgetPasswordConfirm" element={<ForgetPasswordConfirm />} />
                  <Route path="resetPassword/:resetToken" element={<ResetPasswordPage />} />
                  <Route path="unauthorized" element={<Forbidden />} />
                </Route>
              </Routes>
            </UserProvider>
          </AuthProvider>
        </BrowserRouter>
        <CustomToaster />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
