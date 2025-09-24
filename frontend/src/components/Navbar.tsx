'use client';

import { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { useThemeStore, getThemeClasses } from '@/store/themeStore';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { useAppStore } from '@/store/appStore';
import SearchResults from './SearchResults';
import Link from 'next/link';

const Navbar = () => {
  const { color, nextColor } = useThemeStore();
  const { isSearchOpen, setSearchOpen, searchQuery, setSearchQuery } = useAppStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const theme = getThemeClasses(color);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${theme.background} ${theme.text}`}>
        {/* Top Navbar */}
        <div className="px-12 sm:px-24 lg:px-48">
          <div className="flex items-center justify-between h-16">
            {/* Company Name */}
            <div className="flex-shrink-0">
              <h1 className={`text-xl font-bold ${theme.primary}`}>
                Infi Markets
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <div className={`relative ${isSearchOpen ? theme.searchBg : theme.cardBg} ${isSearchOpen ? 'rounded-t-lg border border-b-0' : 'rounded-lg'} ${isSearchOpen ? theme.searchBorder : ''}`}>
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme.textSecondary}`} />
                  <input
                    type="text"
                    placeholder="Search for a market..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    className={`search-input w-full pl-10 pr-4 py-2 bg-transparent ${theme.text} placeholder-gray-400 outline-none ${isSearchOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
                  />
                </div>
                
                {/* Search Results Dropdown */}
                {isSearchOpen && (
                  <div className={`absolute top-full left-0 right-0 ${theme.searchBg} rounded-b-lg shadow-xl z-50 border border-t ${theme.searchBorder}`} style={{ height: '384px' }}>
                    <SearchResults onClose={() => setSearchOpen(false)} />
                  </div>
                )}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Connect Wallet Button */}
              <WalletSelector />

              {/* Hamburger Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`p-2 rounded-lg ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/15 transition-all duration-200`}
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                {/* Hamburger Menu Dropdown */}
                {isMenuOpen && (
                  <div className={`absolute top-full right-0 mt-2 w-40 ${theme.cardBg} border ${theme.border} rounded-lg shadow-lg z-50`}>
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className={`block px-4 py-2 ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/10 transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/politics"
                        className={`block px-4 py-2 ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/10 transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Politics
                      </Link>
                      <Link
                        href="/sports"
                        className={`block px-4 py-2 ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/10 transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sports
                      </Link>
                      <Link
                        href="/crypto"
                        className={`block px-4 py-2 ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/10 transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Crypto
                      </Link>
                      <Link
                        href="/economics"
                        className={`block px-4 py-2 ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/10 transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Economics
                      </Link>
                      <Link
                        href="/entertainment"
                        className={`block px-4 py-2 ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/10 transition-colors`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Entertainment
                      </Link>
                      <button
                        onClick={nextColor}
                        className={`w-full text-left px-4 py-2 ${theme.textSecondary} hover:${theme.primary} hover:bg-gray-600/10 transition-colors`}
                      >
                        Theme: {color.charAt(0).toUpperCase() + color.slice(1)}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </nav>

    </>
  );
};

export default Navbar;
