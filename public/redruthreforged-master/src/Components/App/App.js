import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AdminProvider } from '../../Context/AdminContext';
import { Account } from '../Account'

import Navbar from '../Navbar/Navbar'
import Admin from '../Admin/Admin'
import Home from '../Home/Home'
import Record from '../Record/Record'
import NotFound from '../Errors/NotFound'
import SignUp from '../SignUp';
import Login from '../Login';
import Logout from '../Logout';
import './App.css';
import ProtectedRoute from '../ProtectedRoute';
import Settings from '../Settings';
import { Box } from '@mui/material';

function App() {
  const safeContentArea = {
    paddingTop: 9,
		width: '100%',
  }

  return (
    <Box>
      <AdminProvider>
        <BrowserRouter>
          <Account>
            <Navbar />
            <Box sx={safeContentArea}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/record" element={<Record />}>
                  <Route path=':prompt_id_url' />
                </Route>
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Box>
          </Account>
        </BrowserRouter>
      </AdminProvider>
    </Box>

  );
}

export default App;
