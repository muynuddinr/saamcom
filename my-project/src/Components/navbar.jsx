import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    'Stores', 'Women', 'Men', 'Kids', 'Accessories', 'Beauty', 'Brands'
  ];

  return (
    <nav className="bg-white border-b border-gray-100 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-700 to-purple-800 text-white py-2.5">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <Link to="/become-vendor" className="flex items-center space-x-1.5 hover:text-white/90 transition-colors">
              <span className="text-amber-400">●</span>
              <span className="font-medium">Become a Vendor</span>
            </Link>
            <Link to="/vendors" className="hover:text-white/90 transition-colors font-medium">Vendors</Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/track-order" className="hover:text-white/90 transition-colors font-medium">Track Order</Link>
            <Link to="/help" className="hover:text-white/90 transition-colors font-medium">Help</Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-3xl font-black tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-700">
              FASHION HUB
            </span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-12">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search products, brands and more..."
                className="w-full px-6 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-full focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 transition-all duration-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white p-2.5 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 active:scale-95">
                <FiSearch size={20} />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/wishlist" className="flex flex-col items-center text-gray-700 hover:text-violet-600 transition-all duration-300">
              <div className="relative p-2.5 hover:bg-violet-50 rounded-full transition-colors group">
                <FiHeart size={22} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 bg-violet-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">0</span>
              </div>
              <span className="text-xs mt-1 font-medium">Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-gray-700 hover:text-violet-600 transition-all duration-300">
              <div className="relative p-2.5 hover:bg-violet-50 rounded-full transition-colors group">
                <FiShoppingCart size={22} className="group-hover:scale-110 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-md">0</span>
              </div>
              <span className="text-xs mt-1 font-medium">Cart</span>
            </Link>
            <div className="relative group">
              <button className="flex flex-col items-center text-gray-700 hover:text-violet-600 transition-all duration-300">
                <div className="p-2.5 hover:bg-violet-50 rounded-full transition-colors">
                  <FiUser size={22} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="text-xs mt-1 font-medium">Account</span>
              </button>
              {/* Account Megamenu */}
              <div className="absolute right-0 w-64 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="p-4 space-y-3">
                  <Link to="/Register" className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors font-medium">
                    Register
                  </Link>
                  <Link to="/Login" className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg transition-colors font-medium">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-violet-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMenu size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Categories Menu */}
        <div className="hidden md:flex items-center justify-center space-x-12 mt-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className="text-gray-700 hover:text-violet-600 font-medium relative group py-2"
            >
              {category}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-2xl animate-slideDown">
          <div className="container mx-auto px-4 py-4">
            <div className="space-y-6">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, brands and more..."
                  className="w-full px-4 py-3.5 bg-gray-50 rounded-xl focus:outline-none focus:ring-4 focus:ring-violet-500/10 border-2 border-gray-100 focus:border-violet-500 transition-all duration-300"
                />
                <FiSearch className="absolute right-3 top-4 text-gray-400" />
              </div>

              {/* Mobile Categories */}
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${category.toLowerCase()}`}
                    className="text-gray-700 hover:text-violet-600 hover:bg-violet-50 py-2.5 px-4 rounded-xl transition-colors font-medium"
                  >
                    {category}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-2">
                <Link to="/wishlist" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg">
                  <FiHeart size={20} className="text-gray-500" />
                  <span>Wishlist</span>
                </Link>
                <Link to="/cart" className="flex items-center space-x-2 p-3 hover:bg-indigo-50 rounded-lg">
                  <FiShoppingCart size={20} className="text-gray-500" />
                  <span>Cart</span>
                </Link>
              </div>

              {/* Mobile Account Links */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <Link to="/register" className="block p-3 hover:bg-indigo-50 rounded-lg">Register</Link>
                <Link to="/signin" className="block p-3 hover:bg-indigo-50 rounded-lg">Sign In</Link>
              </div>

              {/* Mobile Additional Links */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <Link to="/become-vendor" className="block p-3 hover:bg-indigo-50 rounded-lg">Become a Vendor</Link>
                <Link to="/vendors" className="block p-3 hover:bg-indigo-50 rounded-lg">Vendors</Link>
                <Link to="/track-order" className="block p-3 hover:bg-indigo-50 rounded-lg">Track Order</Link>
                <Link to="/help" className="block p-3 hover:bg-indigo-50 rounded-lg">Help</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
