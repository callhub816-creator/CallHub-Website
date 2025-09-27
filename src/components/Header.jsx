import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User, LogOut, Settings, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('callhub_current_user') || 'null');
    setIsLoggedIn(!!currentUser);
    setUser(currentUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('callhub_current_user');
    setIsLoggedIn(false);
    setUser(null);
    toast({
      title: "Logged Out Successfully! 👋",
      description: "You have been logged out of your CallHub account.",
    });
    navigate('/');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard', protected: true },
    { href: '/analytics', label: 'Analytics', protected: true },
    { href: '/support', label: 'Support' }
  ];

  const filteredNavLinks = navLinks.filter(link => !link.protected || isLoggedIn);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-purple-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CH</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CallHub.in
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-gray-300 hover:text-white transition-colors duration-300 ${
                  location.pathname === link.href ? 'text-purple-400' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">{user?.name || 'User'}</span>
                </div>
                
                <Button
                  onClick={() => navigate('/profile')}
                  variant="outline"
                  size="sm"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </Button>
                
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-slate-800/95 backdrop-blur-lg rounded-lg mt-2 p-4 border border-purple-500/20"
          >
            <div className="space-y-4">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-gray-300 hover:text-white transition-colors duration-300 ${
                    location.pathname === link.href ? 'text-purple-400' : ''
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-slate-600 pt-4">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-300">{user?.name || 'User'}</span>
                    </div>
                    
                    <Button
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Header;