import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Button = ({ hidden, block }) => {
  return (
    <Link
      to="/shop/sign-in"
      className={`${hidden} ${block}  bg-gray-700 py-3 px-2 rounded-md text-white cursor-pointer`}
    >
      Become a seller
    </Link>
  );
};

export default Button;
