import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaSearch } from 'react-icons/fa';
import { BiMenuAltLeft, BiMenuAltRight } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import { FaRegHeart, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import DopDown from './DopDown';
import NavBar from './NavBar';
import Search from './Search';
import Button from './Button';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import Cart from '../cart/Cart';
import Wishlist from '../wishlist/Wishlist';

const Header = ({ activateHeader }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const { wishlist } = useSelector((state) => state.wishlist);

  const [open, setOpen] = useState(false);
  const [opneWishlist, setOpneWishlist] = useState(false);
  const [active, setActive] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <header>
      <div
        className={`container py-3 flex static justify-between items-center gap-4 bg-slate-300 shadow-sm sm:bg-transparent sm:shadow-none  ${
          active && 'fixed top-0 left-0 w-full z-50'
        }`}
      >
        <Link to="/">
          <img src={logo} alt="" className=" object-cover w-full" />
        </Link>
        <Search hidden="hidden" block="sm:block" />
        <Button hidden="hidden" block="md:block" />
        <div className="flex items-center gap-4 ml-auto sm:hidden">
          <div className=" relative">
            <FaRegHeart size={28} onClick={() => setOpneWishlist(true)} />
            <span className="absolute -top-3 -right-3 text-white text-center leading-5 w-5 h-5 bg-red-500 rounded-full ">
              {' '}
              {wishlist?.length}
            </span>
          </div>
          <div className=" relative">
            <MdOutlineShoppingCart
              size={28}
              onClick={() => setCartOpen(true)}
            />
            <span className="absolute -top-3 -right-3 text-white text-center leading-5 w-5 h-5 bg-red-500 rounded-full ">
              {cart.length}
            </span>
          </div>
          <div>
            {currentUser ? (
              <Link to="/profile" className="block w-[40px] h-[40px]">
                <img
                  src={`${backend_url}${currentUser?.avatar}`}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/sign-in">
                <FaRegUserCircle size={28} color="white" />
              </Link>
            )}{' '}
          </div>
        </div>
        <BiMenuAltRight
          size={45}
          className=" md:hidden"
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>
      <div
        className={`sm:bg-[#3321c8] h-0 bg-transparent sm:h-fit ${
          active && 'fixed top-0 left-0 w-full z-50'
        }`}
      >
        <div className="container h-[70px]  sm:flex sm:justify-between sm:items-center gap-8">
          <DopDown hidden="hidden" block="lg:block" />
          <NavBar
            activateHeader={activateHeader}
            open={open}
            setOpen={setOpen}
          />

          <div className=" items-center gap-6 hidden sm:flex">
            <div className=" relative">
              <FaRegHeart
                size={28}
                color="white"
                onClick={() => setOpneWishlist(true)}
              />
              <span className="absolute -top-3 -right-3 text-white text-center leading-5 w-5 h-5 bg-red-500 rounded-full ">
                {wishlist?.length}
              </span>
            </div>
            <div className=" relative">
              <MdOutlineShoppingCart
                size={28}
                color="white"
                onClick={() => setCartOpen(true)}
              />
              <span className="absolute -top-3 -right-3 text-white text-center leading-5 w-5 h-5 bg-red-500 rounded-full ">
                {cart.length}
              </span>
            </div>

            {currentUser ? (
              <Link to="/profile" className="block w-[40px] h-[40px]">
                <img
                  src={`${backend_url}${currentUser?.avatar}`}
                  className="w-full h-full rounded-full"
                  alt=""
                />
              </Link>
            ) : (
              <Link to="/sign-in">
                <FaRegUserCircle size={28} color="white" />
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Cart component */}
      {cartOpen && <Cart setCartOpen={setCartOpen} />}
      {opneWishlist && <Wishlist setCartOpen={setOpneWishlist} />}
    </header>
  );
};

export default Header;
