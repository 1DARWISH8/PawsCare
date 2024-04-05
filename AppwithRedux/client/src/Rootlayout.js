import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import './RootLayout.css'; // Import CSS for custom styling

function RootLayout() {
  return (
    <div className="root-layout">
      <Header />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
