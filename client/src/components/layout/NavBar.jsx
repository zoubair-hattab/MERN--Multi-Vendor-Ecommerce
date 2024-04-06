import React, { useState } from 'react';
import { navItems } from '../../static/data';
import { Link } from 'react-router-dom';
import Search from './Search';
import Button from './Button';
import DopDown from './DopDown';
import { IoMdClose } from 'react-icons/io';
const NavBar = ({ activateHeader, open, setOpen }) => {
  return (
    <nav
      className={`fixed  overflow-auto  z-50 left-[-320px] sm:translate-x-0 py-6  px-2 sm:px-0 sm:py-0  h-screen top-0  ${
        open && 'translate-x-[320px]  '
      } max-w-[320px] w-full bg-white sm:h-fit sm:bg-transparent sm:static sm:max-w-full sm:block shadow-md sm:shadow-none mr-auto duration-300 transition-all`}
    >
      <ul className="flex py-6 flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 ">
        <Search hidden="block" block="sm:hidden" />
        {navItems &&
          navItems.map((item, index) => (
            <li
              className={`${
                activateHeader == index + 1 ? 'text-teal-500' : 'sm:text-white '
              }  text-lg   font-medium p-3 sm:p-0 hover:bg-slate-300 transition-all duration-300
              cursor-pointer`}
              key={item?.title}
            >
              <Link to={item.url}>{item?.title}</Link>
            </li>
          ))}
        <DopDown hidden="block" block="sm:hidden" />
        <Button hidden="block" block="sm:hidden" />
      </ul>
      <IoMdClose
        size={25}
        className="absolute top-2 right-2 sm:hidden"
        onClick={() => setOpen(false)}
      />
    </nav>
  );
};

export default NavBar;
