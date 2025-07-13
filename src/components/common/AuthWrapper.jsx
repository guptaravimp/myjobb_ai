"use client"

import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import AuthHeader from './AuthHeader';

const AuthWrapper = () => {
  const [currentPage, setCurrentPage] = useState('signup');

  const handleSwitchPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-black">
      <AuthHeader currentPage={currentPage} onSwitchPage={handleSwitchPage} />
      
      <div className="pt-16">
        {currentPage === 'login' ? (
          <Login />
        ) : (
          <Signup />
        )}
      </div>
    </div>
  );
};

export default AuthWrapper; 