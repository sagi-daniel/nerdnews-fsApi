import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import { Toaster } from 'react-hot-toast';

//CONTEXTS
import { DarkModeProvider } from './context/DarkModeContext';

//COMPONENTS
import AppLayout from './components/parts/AppLayout';
import Home from './pages/Home';
import News from './pages/News';
import UpcomingMovies from './pages/UpcomingMovies';
import IpCidrCalculator from './pages/IpCidrCalculator';

import SignUp from './pages/SignUp';
import Login from './pages/Login';

import PageNotFound from './pages/PageNotFound';

//CONSTANTS
import { QUERY_DEFAULT_OPTIONS } from './utils/constants';

function App() {
  return (
    <>
      <QueryClientProvider client={new QueryClient(QUERY_DEFAULT_OPTIONS)}>
        <ReactQueryDevtools initialIsOpen={false} />
        <DarkModeProvider>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  // <ProtectedRoute>
                  <AppLayout />
                  // </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="Home" />} />
                <Route path="home" element={<Home />} />
                <Route path="news" element={<News />} />
                <Route path="movies" element={<UpcomingMovies />} />
                <Route path="cidr" element={<IpCidrCalculator />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="login" element={<Login />} />
                {/* <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="account" element={<Account />} /> */}
                <Route path="*" element={<PageNotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DarkModeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
