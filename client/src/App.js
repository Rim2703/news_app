import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';
import NewsFeed from './components/News';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Additional login logic...
  };

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Navbar />}
        
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
          <Route exact path="/home" element={<h1 style={{ textAlign: 'center', margin: '100px', fontSize: '24px' }}>Welcome to News Feed</h1>} />

          <Route exact path="/technology" element={<NewsFeed interest="technology" />} />
          <Route exact path="/sports" element={<NewsFeed interest="sports" />} />
          <Route exact path="/politics" element={<NewsFeed interest="politics" />} />
          <Route exact path="/entertainment" element={<NewsFeed interest="entertainment" />} />
          <Route exact path="/health" element={<NewsFeed interest="health" />} />
          <Route exact path="/education" element={<NewsFeed interest="science" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;





