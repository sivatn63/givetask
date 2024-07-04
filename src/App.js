import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import './Styles.css'

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
