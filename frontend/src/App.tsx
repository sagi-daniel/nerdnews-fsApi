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

import ForgetPasswordConfirmPage from './pages/authPages/ForgetPasswordConfirmPage';
import DeleteAccountConfimPage from './pages/authPages/DeleteAccountConfimPage';

import PrivacyPolicy from './pages/publicPages/PrivacyPolicy';
import PageNotFound from './pages/PageNotFound';
import Forbidden from './pages/Forbidden';

//PROTECTED PAGES
//USER PRIVILEGE
import MyAccount from './pages/protectedPages/MyAccount';
import MyMovies from './pages/protectedPages/MyMovies';
import MyNews from './pages/protectedPages/MyNews';
import UpdatePasswordPage from './pages/authPages/UpdatePasswordPage';

//ADMIN PIRIVLEGE
import EditUsers from './pages/protectedPages/EditUsers';
import EditCategories from './pages/protectedPages/EditCategories';
import EditSources from './pages/protectedPages/EditSources';
import EditNews from './pages/protectedPages/EditNews';
import EditMovies from './pages/protectedPages/EditMovies';

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
                    path="editNews"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <EditNews />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="EditMovies"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <EditMovies />
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
                    path="EditUsers"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <EditUsers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="EditCategories"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <EditCategories />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="EditSources"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <EditSources />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="signup" element={<SignupPage />} />
                  <Route path="login" element={<LoginPage />} />
                  <Route path="forgetPassword" element={<ForgetPasswordPage />} />
                  <Route path="forgetPasswordConfirm" element={<ForgetPasswordConfirmPage />} />
                  <Route path="resetPassword/:resetToken" element={<ResetPasswordPage />} />
                  <Route path="deleteAccountConfrim" element={<DeleteAccountConfimPage />} />
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
