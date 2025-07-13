import { Button } from "./ui/button.jsx"
import { Separator } from "./ui/separator.jsx"
import { SidebarTrigger } from "./ui/sidebar.jsx"
import { useDispatch } from "react-redux"
import { setToken } from "../store/authSlice.js"
import { useState } from "react"

export function SiteHeader() {
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(setToken(null));
    window.location.reload();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="glass border-b border-gray-800 relative">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 p-4 lg:p-6">
        <div className="flex items-center gap-2 min-w-0">
          <SidebarTrigger className="-ml-1 text-gray-300 hover:text-white hidden sm:block" />
          <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4 bg-gray-700 hidden sm:block" />
          
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold gradient-text truncate">
              Dashboard Overview
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-gray-300 hidden sm:block">
              Welcome to your dashboard. Here's what's happening with your products.
            </p>
            <p className="text-xs text-gray-400 sm:hidden">
              Dashboard
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleLogout}
            className="px-3 py-2 sm:px-6 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 hover-lift text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Logout</span>
            <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-[99999] sm:hidden shadow-2xl">
          <div className="p-4 space-y-4">
            <nav className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Settings</span>
                </div>
              </button>
              
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors text-gray-300 hover:text-white">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Help</span>
                </div>
              </button>
            </nav>

            <button 
              onClick={handleLogout}
              className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
