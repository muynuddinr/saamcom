import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import PrivateRoute from './PrivateRoute';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;