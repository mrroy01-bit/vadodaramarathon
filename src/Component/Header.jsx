import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaPinterestP, FaYoutube } from 'react-icons/fa';
import Logo from '../assest/logo.png';
import Aims from '../assest/aims.jpg';
import Certified from '../assest/certified.png';
import Circle from '../assest/circle.jpg';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

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
    { label: 'Causes we support 2024', href: '#' },
    { label: 'Know Us', href: '#' },
    { label: 'Join The Team', href: '#' },
    { label: 'Philanthropy', href: '#' },
  ];

  return (
    <header className="w-full shadow-sm relative z-50">
      {/* Top Row */}
      <div className="flex  items-center bg-white px-6 py-3 border-b">
        <img src={Logo} alt="Logo" className="h-40 w-auto object-contain absolute top-[13px]" />

        <div className="flex ml-[65vw] items-center gap-4">
          <img src={Aims} alt="AIMS" className="h-10 w-auto" />
          <img src={Certified} alt="Certified" className="h-12 w-auto" />
          <img src={Circle} alt="Circle" className="h-12 w-auto" />
          <div className="flex gap-3 text-xl ml-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-blue-600 hover:opacity-80"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-pink-600 hover:opacity-80"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-blue-400 hover:opacity-80"><FaTwitter /></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="text-red-500 hover:opacity-80"><FaPinterestP /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="text-red-600 hover:opacity-80"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-purple-800 h-12 text-white text-sm font-bold">

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
                            className="block px-4 py-2 hover:bg-purple-100 transition-colors"
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <a href={item.href} className="hover:text-purple-200 transition-colors">{item.label}</a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
