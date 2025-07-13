import React from 'react';
import { Button } from '../ui/button';

const AuthHeader = ({ currentPage, onSwitchPage }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
    
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MyJObb AI
              </h1>
              <p className="text-xs text-gray-400">AI-Powered Platform</p>
            </div>
          </div>

         
          <nav className="flex items-center space-x-4">
            <Button
              variant={currentPage === 'login' ? 'default' : 'ghost'}
              onClick={() => onSwitchPage('login')}
              className={`${
                currentPage === 'login'
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              } transition-all duration-200`}
            >
              Sign In
            </Button>
            <Button
              variant={currentPage === 'signup' ? 'default' : 'ghost'}
              onClick={() => onSwitchPage('signup')}
              className={`${
                currentPage === 'signup'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              } transition-all duration-200`}
            >
              Sign Up
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader; 