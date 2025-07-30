import React, { useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from 'react-icons/fa';
import Logo from '../assest/logo.png';
import Aims from '../assest/aims.jpg';
import Certified from '../assest/certified.png';
import Circle from '../assest/circle.jpg';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDropdown = (menu) => {
    setOpenDropdown(menu);
  };

  const navItems = [
    { label: 'VM-SDG', href: 'https://www.youtube.com/watch?v=sO-boF7QYmI' },
    {
      label: 'VM 2026',
      submenu: [
        { label: 'Overview', href: '#' },
        { label: 'Registration', href: '#' },
        { label: 'Results', href: '#' },
      ],
    },
    {
      label: 'VM 2025',
      submenu: [
        { label: 'Overview', href: '#' },
        { label: 'Gallery', href: '#' },
        { label: 'Sponsors', href: '#' },
      ],
    },
    { label: 'VM Editions', href: '/vm' },
    { label: 'Causes we support 2024', href: '/causes-support' },
    { label: 'Know Us', href: '/know-us' },
    { label: 'Join The Team', href: '/join-the-team' },
    { label: 'Philanthropy', href: '/philanthropy' },
  ];

  return (
    <header className="relative z-50 w-full shadow-sm">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-white border-b sm:flex-nowrap sm:px-6">
        <img
          src={Logo}
          alt="Logo"
          className="h-20 sm:h-40 w-auto object-contain sm:absolute sm:left-6 sm:top-[13px]"
        />

        <div className="flex flex-wrap justify-end items-center gap-2 sm:ml-[65vw] sm:gap-4">
          <img src={Aims} alt="AIMS" className="w-auto h-8 sm:h-10" />
          <img src={Certified} alt="Certified" className="w-auto h-8 sm:h-12" />
          <img src={Circle} alt="Circle" className="w-auto h-8 sm:h-12" />

          <div className="hidden gap-3 ml-2 text-xl sm:flex sm:ml-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:opacity-80" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:opacity-80" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:opacity-80" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-red-500 hover:opacity-80" aria-label="Pinterest"><FaPinterestP /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-red-600 hover:opacity-80" aria-label="YouTube"><FaYoutube /></a>
          </div>

          {/* Hamburger for mobile */}
          <button
            className="p-2 ml-2 rounded sm:hidden focus:outline-none focus:ring-2 focus:ring-purple-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6 text-purple-800" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden h-12 text-sm font-bold text-white bg-purple-800 sm:block">
        <ul className="flex items-center ml-[60vh] px-8 py-3 gap-6 relative">
          {navItems.map((item, idx) => (
            <li key={idx} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    onMouseEnter={() => handleDropdown(item.label)}
                    onMouseLeave={() => handleDropdown(null)}
                    className="focus:outline-none group-hover:text-purple-200"
                  >
                    {item.label}
                  </button>
                  {openDropdown === item.label && (
                    <ul
                      onMouseEnter={() => handleDropdown(item.label)}
                      onMouseLeave={() => handleDropdown(null)}
                      className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-md min-w-[10rem] z-50"
                    >
                      {item.submenu.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <a
                            href={subItem.href}
                            className="block px-4 py-2 transition-colors hover:bg-purple-100"
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a href={item.href} className="transition-colors hover:text-purple-200">{item.label}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black sm:hidden bg-opacity-40" onClick={() => setMobileMenuOpen(false)}>
          <nav
            className="fixed top-0 left-0 z-50 w-64 h-full p-6 text-purple-800 bg-white shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="p-2 mb-6 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="flex flex-col gap-4">
              {navItems.map((item, idx) => (
                <li key={idx} className="relative">
                  {item.submenu ? (
                    <details>
                      <summary className="px-2 py-2 rounded cursor-pointer hover:bg-purple-100">{item.label}</summary>
                      <ul className="mt-1 ml-4">
                        {item.submenu.map((subItem, subIdx) => (
                          <li key={subIdx}>
                            <a
                              href={subItem.href}
                              className="block px-2 py-1 rounded hover:bg-purple-50"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subItem.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <a
                      href={item.href}
                      className="block px-2 py-2 rounded hover:bg-purple-100"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex gap-3 mt-8 text-xl">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:opacity-80" aria-label="Facebook"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-pink-600 hover:opacity-80" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:opacity-80" aria-label="Twitter"><FaTwitter /></a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-red-500 hover:opacity-80" aria-label="Pinterest"><FaPinterestP /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-red-600 hover:opacity-80" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
