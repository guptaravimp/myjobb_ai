import { Button } from "./ui/button.jsx"
import { Separator } from "./ui/separator.jsx"
import { SidebarTrigger } from "./ui/sidebar.jsx"
import { useDispatch } from "react-redux"
import { setToken } from "../store/authSlice.js"
import { useState, useEffect } from "react"
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
} from "@tabler/icons-react"

const navItems = [
  {
    title: "Dashboard",
    icon: IconDashboard,
  },
  {
    title: "Products",
    icon: IconListDetails,
  },
  {
    title: "Analytics",
    icon: IconChartBar,
  },
  {
    title: "Setting",
    icon: IconFolder,
  },
];

export function SiteHeader({ activeTab, setActiveTab }) {
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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavItemClick = (title) => {
    if (setActiveTab) {
      setActiveTab(title);
    }
    closeMobileMenu();
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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
      </header>

      {/* Mobile Menu - Rendered outside header to avoid positioning issues */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] sm:hidden" 
            onClick={closeMobileMenu}
            style={{ zIndex: 99998 }}
          />
          
          {/* Mobile Menu */}
          <div 
            className="mobile-menu-container fixed top-0 left-0 w-80 h-full bg-gray-900/95 backdrop-blur-md border-r border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out sm:hidden overflow-y-auto"
            style={{ zIndex: 99999 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Navigation Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-3 px-2">Navigation</h3>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeTab === item.title;
                    return (
                      <button
                        key={item.title}
                        onClick={() => handleNavItemClick(item.title)}
                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                          isActive 
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <IconComponent className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                        <span className="font-medium">{item.title}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-blue-400 rounded-full"></div>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Logout Section */}
              <div className="pt-4 border-t border-gray-800">
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
          </div>
        </>
      )}
    </>
  );
}
