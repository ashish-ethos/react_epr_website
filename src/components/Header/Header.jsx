import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { Menu, X } from 'lucide-react';
import { IoIosArrowDown } from "react-icons/io";
import { Dropdown, Space } from "antd"; 
import "./Header.css";
import CompanyHeaderLogo from "../../assets/images/logo/ethos_pro_darkmode.png";
import MobileHeaderLogo from "../../assets/images/logo/EPR_logo.png";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "Projects",
      dropdown: [
        { name: "Residential", path: "/projects/residential", key: "1" },
        { name: "Commercial", path: "/projects/commercial", key: "2" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const onClick = ({ key }) => {};

  const getDropdownItems = (dropdown) =>
    dropdown.map((sub) => ({
      label: (
        <NavLink
          to={sub.path}
          className={({ isActive }) =>
            `block px-4 py-1 text-sm hover:bg-gray-700 ${
              isActive ? "text-[#c08830] font-semibold" : "text-[#c08830]"
            }`
          }
        >
          {sub.name}
        </NavLink>
      ),
      key: sub.key,
    }));

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-gray-900 shadow-md" : "bg-black bg-opacity-80"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center header-mobile">
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={CompanyHeaderLogo}
            alt="Logo"
            className="h-14 w-auto cursor-pointer hidden md:block"
          />
          <img
            src={MobileHeaderLogo}
            alt="Mobile Logo"
            className="h-12 p-1 w-auto cursor-pointer block md:hidden"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) =>
            item.dropdown ? (
              <div
                className="relative"
                key={item.name}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Dropdown
                  menu={{ items: getDropdownItems(item.dropdown), onClick }}
                  trigger={["hover"]}
                  open={item.name === hoveredItem}
                  overlayClassName="custom-dropdown"
                >
                  <span className="flex items-center font-medium cursor-pointer text-[#c08830] hover:text-[#e6b800]">
                    {item.name} <IoIosArrowDown className="ml-1 mt-1" />
                  </span>
                </Dropdown>
              </div>
            ) : (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative font-medium hover:text-[#e6b800] transition ${
                    isActive ? "text-[#c08830]" : "text-[#c08830]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center space-x-4 header-started">
          <a className="fancy" href="#">
            <span className="top-key"></span>
            <span className="text">+91 8744964496</span>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </a>
        </div>

        <button
          className="md:hidden text-3xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6 text-[#c08830] cross-mobile-icon" /> : <Menu className="w-6 h-6 text-[#c08830] cross-mobile-icon" />}
        </button>
      </div>

      <div
        className={`md:hidden bg-gray-900 shadow-lg fixed top-12 right-0 w-64 h-screen transition-transform duration-500 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-4">
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.name}>
                <button
                  className="flex items-center justify-between fontFamily-bebas w-full text-left font-medium text-[#c08830]"
                  onClick={() => setProjectsOpen(!projectsOpen)}
                >
                  {item.name} <FaCaretDown />
                </button>
                {projectsOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {item.dropdown.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        onClick={() => setMobileOpen(false)}
                        className="block text-[#c08830] hover:text-[#e6b800]"
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block font-medium text-[#c08830] hover:text-[#e6b800]"
                >
                  {item.name}
                </NavLink>
              </li>
            )
          )}
          <li>
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-[#c08830] text-gray-900 font-semibold py-2 px-6 rounded-full hover:bg-[#e6b800]"
            >
              +91 8744964496
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;