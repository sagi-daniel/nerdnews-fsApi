import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Toaster } from 'react-hot-toast';

import AppLayout from './components/parts/AppLayout';
import Home from './pages/Home';
import UpcomingMovies from './pages/UpcomingMovies';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <>

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
            <Route path="bookings" element={<UpcomingMovies />} />
            {/* <Route path="bookings/:bookingId" element={<Booking />} />
            <Route path="checkin/:bookingId" element={<Checkin />} />
            <Route path="account" element={<Account />} /> */}
          </Route>

          {/* <Route path="login" element={<Login />} /> */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
