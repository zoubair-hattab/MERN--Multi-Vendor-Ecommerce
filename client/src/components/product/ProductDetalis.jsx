import React, { useEffect, useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { backend_url } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartReducer';
import { toast } from 'react-toastify';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/reducers/wishlistReducer';

const ProductDetalis = ({ setOpenModal, product }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [counter, setCounter] = useState(1);
  const [error, setError] = useState();

  useEffect(() => {
    const isChecked = wishlist?.find((item) => item._id == product?._id);
    if (isChecked) {
      setClick(true);
    }
  }, [wishlist, product]);

  const inCrument = () => {
    if (counter <= product.stock) {
      setError();

      setCounter((prevCounter) => prevCounter + 1);
    } else {
      setError('Out of Stock');
    }
  };
  const deCrument = () => {
    if (counter >= 2) {
      setError();
      setCounter((prevCounter) => prevCounter - 1);
    } else {
      setError('Out of Stock');
    }
  };

  const addTocartHandler = (product) => {
    const isExisit = cart?.find((item) => item._id == product._id);
    if (isExisit) {
      toast.error('This Product alredy exisit.');
    } else {
      dispatch(addToCart({ ...product, qty: counter }));
      toast.success('This Product is added to cart.');
    }
  };
  return (
    <div className="bg-[#00000030]  fixed top-0 left-0 w-full  h-screen z-50 px-3 flex items-center justify-center">
      <div className="max-w-5xl h-4/6 w-full  bg-white px-3 py-7  flex relative  gap-6 rounded-md flex-wrap md:flex-nowrap overflow-auto">
        <IoMdClose
          size={30}
          className="absolute top-2 right-2"
          onClick={() => setOpenModal(false)}
        />
        <div className="md:flex-1 flex flex-col gap-3 ">
          <img
            src={`${backend_url}${product?.images[0]}`}
            alt=""
            className="w-full  h-[350px] object-contain "
          />
          <div className="flex items-center gap-3 ">
            <img
              src={`${backend_url}${product?.shop.avatar}`}
              alt=""
              className="w-14 h-14 rounded-full object-con"
            />
            <div>
              <h3>{product.shop.name}</h3>
              <h3 className="mt-2"> ({product.shop.ratings}) Ratings</h3>
            </div>
          </div>
          <div className={`w-fit bg-[#000]  rounded-md py-4 px-2`}>
            <span className="text-[#fff] flex items-center">
              Send Message <AiOutlineMessage className="ml-1" />
            </span>
          </div>
          <h5 className="text-[16px] text-[red] ">
            ({product.total_sell}) Sold out
          </h5>
        </div>
        <div className="md:flex-1 w-full flex flex-col gap-3">
          <h2 className="font-semibold text-lg">{product?.name}</h2>
          <p>{product?.description}</p>
          <div className="flex pt-3">
            <h4 className="font-medium text-teal-500 text-xl">
              {product?.discountPrice}$
            </h4>

            <h3 className="font-medium text-xl text-red-500 -mt-2 ml-1 line-through">
              {product?.originalPrice ? product?.originalPrice + '$' : null}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              <button
                onClick={deCrument}
                className="w-12 h-12 inline-block bg-teal-400 shadow-lg rounded-l-md text-lg font-medium text-white"
              >
                -
              </button>
              <span className="flex w-12 h-12  items-center justify-center bg-gray-200 text-lg font-medium ">
                {counter}
              </span>
              <button
                onClick={inCrument}
                className="inline-block w-12 h-12 bg-teal-400 shadow-lg rounded-r-md text-lg font-medium text-white"
              >
                +
              </button>
            </div>
            {error && <p className="text-red-500 mr-auto px-2">{error}</p>}

            <div>
              {click ? (
                <AiFillHeart
                  size={30}
                  className="cursor-pointer "
                  onClick={() => dispatch(removeFromWishlist(product))}
                  color={click ? 'red' : '#333'}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={30}
                  className="cursor-pointer "
                  onClick={() => dispatch(addToWishlist(product))}
                  color={click ? 'red' : '#333'}
                  title="Add to wishlist"
                />
              )}
            </div>
          </div>
          <div
            onClick={() => addTocartHandler(product)}
            className={`w-fit bg-[#000]  rounded-md py-4 px-2 mt-2`}
          >
            <span className="text-[#fff] flex items-center">
              Add to cart <AiOutlineShoppingCart className="ml-1" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetalis;
