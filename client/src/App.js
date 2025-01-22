import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import MaterialFormPage from './pages/MaterialFormPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* Protected Dashboard Route */}
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <DashboardPage />
                    </PrivateRoute>
                } />
                <Route path="/material/add" element={<MaterialFormPage />} />
            </Routes>
        </Router>
    );
}

export default App;
