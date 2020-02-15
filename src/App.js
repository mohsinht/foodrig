import React from 'react';
import { Button } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

import MainLayout from './main/MainLayout';

function App() {
  return (
    <div>
      <MainLayout />
    </div>
  );
}

export default App;
