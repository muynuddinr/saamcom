import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navbar';
import Footer from './Components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;