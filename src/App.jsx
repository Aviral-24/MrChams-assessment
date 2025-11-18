 // src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home';
import AddLostPet from './pages/AddLostPet';
import AddFoundPet from './pages/AddFoundPet';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-lost-pet" element={<AddLostPet />} />
            <Route path="/add-found-pet" element={<AddFoundPet />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;