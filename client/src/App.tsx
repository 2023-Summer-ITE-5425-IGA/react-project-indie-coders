import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import PrivacyPolicy from './components/privacy-policy';
import ContactUs from './components/contact-us';
import './App.css';
import Feed from './components/feed';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/feed" element={<Feed />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
