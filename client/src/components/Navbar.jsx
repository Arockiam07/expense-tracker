import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { logoutUser } from "../api/api";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const isLoggedIn = localStorage.getItem("token");

  const linkClass = (path) =>
    `${location.pathname === path
      ? "text-[#00B8F4] font-semibold"
      : "text-[#1A202C] dark:text-gray-300 hover:text-[#00B8F4]"
    } transition`;

  const handleLogout = () => {
    logoutUser();
    setIsOpen(false); // Close mobile menu on logout
    window.location.href = "/login";
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Close mobile menu when a link is clicked
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center space-x-2"
          onClick={handleLinkClick}
        >
          <img src="/animations/logo1.png" alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#001f3f] via-cyan-400 to-cyan-200 bg-clip-text text-transparent">
            Expensetracker
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <ul className="flex items-center gap-4 lg:gap-8 text-base font-medium">
            {isLoggedIn && (
              <>
                <li><Link to="/home" className={linkClass("/home")}>Home</Link></li>
                <li><Link to="/transactions" className={linkClass("/transactions")}>Transactions</Link></li>
                <li><Link to="/budget" className={linkClass("/budget")}>Budget</Link></li>
                <li><Link to="/charts" className={linkClass("/charts")}>Charts</Link></li>
              </>
            )}

            {!isLoggedIn ? (
              <>
                <li><Link to="/login" className={linkClass("/login")}>Login</Link></li>
                <li><Link to="/signup" className={linkClass("/signup")}>SignUp</Link></li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className={linkClass("/login")}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* Theme Toggle - Desktop */}
          <button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1A365D] transition"
            title="Toggle Theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle - Mobile */}
          <button
            onClick={toggleTheme}
            className="text-xl p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-[#1A365D] transition"
            title="Toggle Theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl p-2 text-[#1A202C] dark:text-gray-300"
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Menu */}
        <div className={`
          fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-semibold text-gray-800 dark:text-white">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl p-2 text-gray-600 dark:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-4">
                {isLoggedIn && (
                  <>
                    <li>
                      <Link 
                        to="/home" 
                        className={`block py-3 px-4 rounded-lg ${linkClass("/home")}`}
                        onClick={handleLinkClick}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/transactions" 
                        className={`block py-3 px-4 rounded-lg ${linkClass("/transactions")}`}
                        onClick={handleLinkClick}
                      >
                        Transactions
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/budget" 
                        className={`block py-3 px-4 rounded-lg ${linkClass("/budget")}`}
                        onClick={handleLinkClick}
                      >
                        Budget
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/charts" 
                        className={`block py-3 px-4 rounded-lg ${linkClass("/charts")}`}
                        onClick={handleLinkClick}
                      >
                        Charts
                      </Link>
                    </li>
                  </>
                )}

                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link 
                        to="/login" 
                        className={`block py-3 px-4 rounded-lg ${linkClass("/login")}`}
                        onClick={handleLinkClick}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/signup" 
                        className={`block py-3 px-4 rounded-lg ${linkClass("/signup")}`}
                        onClick={handleLinkClick}
                      >
                        SignUp
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      onClick={handleLogout}
                      className={`block w-full text-left py-3 px-4 rounded-lg ${linkClass("/login")}`}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;