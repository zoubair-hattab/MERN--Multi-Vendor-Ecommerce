import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdStar } from 'react-icons/io';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai';
import { backend_url } from '../../server';
import ProductDetalis from './ProductDetalis';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/reducers/wishlistReducer';
import Ratings from './Ratings';

const SingleProduct = ({ product }) => {
  const [click, setClick] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  useEffect(() => {
    const isChecked = wishlist?.find((item) => item._id == product._id);
    if (isChecked) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, product]);
  return (
    <div className="w-full  bg-white rounded-lg shadow-sm  relative cursor-pointer">
      <Link
        to={`/product/${product?.name.replace(/ /g, '-')}`}
        className="block w-full h-[170px] overflow-hidden "
      >
        <img
          src={`${backend_url}${product?.images[0]}`}
          alt=""
          className="w-full h-full object-contain hover:scale-105 transition-all duration-300"
        />
      </Link>
      <div className="py-4 px-3">
        <Link to={`/shop/${product?.shopId}`}>
          <h3 className="font-semibold text-indigo-500 text-xl py-2">
            {product?.shop.name}
          </h3>
        </Link>

        <Link to={`/product/${product?.name.replace(/ /g, '-')}`}>
          <h2
            className="font-medium text-base line-clamp-1 mb-2"
            title={product?.name}
          >
            {product?.name}
          </h2>
          <div className="flex items-center gap-2 ">
            <Ratings rating={product?.ratings} />
          </div>
          <div className="flex item-center justify-between pt-2">
            <p className="font-medium text-gray-700 text-xl">
              {' '}
              {product?.discountPrice ? product?.discountPrice + '$' : null}
            </p>
            <p className="font-[400] text-[17px] text-[#68d284]">sold</p>
          </div>
        </Link>
      </div>

      {click ? (
        <AiFillHeart
          size={25}
          className="cursor-pointer absolute right-2 top-5"
          onClick={() => dispatch(removeFromWishlist(product))}
          color={click ? 'red' : '#333'}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          size={25}
          className="cursor-pointer absolute right-2 top-5"
          onClick={() => dispatch(addToWishlist(product))}
          color={click ? 'red' : '#333'}
          title="Add to wishlist"
        />
      )}
      <AiOutlineEye
        size={25}
        className="cursor-pointer absolute right-2 top-14"
        onClick={() => setOpenModal(!openModal)}
        color="black"
        title="Quick view"
      />
      <AiOutlineShoppingCart
        size={25}
        className="cursor-pointer absolute right-2 top-24"
        onClick={() => setOpenModal(!openModal)}
        color="black"
        title="Add to cart"
      />
      {openModal && (
        <ProductDetalis
          product={product}
          setOpenModal={setOpenModal}
          key={product?._id}
        />
      )}
    </div>
  );
};

export default SingleProduct;
