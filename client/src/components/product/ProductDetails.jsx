import React, { useEffect, useState } from 'react';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { backend_url } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartReducer';
import {
  addToWishlist,
  removeFromWishlist,
} from '../../redux/reducers/wishlistReducer';
import Ratings from './Ratings';

const ProductDetails = ({ setOpenModal, product }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  const [click, setClick] = useState(false);
  const [counter, setCounter] = useState(1);
  const [error, setError] = useState();
  const [select, setSelect] = useState(0);
  const dispatch = useDispatch();

  const inCrument = () => {
    if (counter <= product?.stock) {
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

  useEffect(() => {
    const isChecked = wishlist?.find((item) => item._id == product?._id);
    if (isChecked) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, product]);
  return (
    <>
      <div className=" w-full   px-3 py-7  flex   gap-7 rounded-md flex-wrap md:flex-nowrap">
        <div className="md:flex-1 flex flex-col gap-4 ">
          <img
            src={`${backend_url}${product?.images[select]}`}
            alt=""
            className="w-full  h-[350px] object-contain "
          />
          <div className="flex item-center gap-2 border p-4 overflow-x-auto">
            {product?.images.map((item, index) => (
              <img
                src={`${backend_url}${item}`}
                alt=""
                className={`block w-full md:w-[20%] h-32 object-cover ${
                  select === index && 'border-2 border-gray-200'
                }`}
                onClick={() => setSelect(index)}
              />
            ))}
          </div>
        </div>
        <div className="md:flex-1 w-full flex flex-col gap-5">
          <h2 className="font-semibold text-lg">{product?.name}</h2>
          <p>{product?.description}</p>
          <div className="flex pt-3">
            <h3 className="font-medium text-xl text-teal-500 ">
              {product?.discountPrice ? product?.discountPrice + '$' : null}
            </h3>
            <h4 className="font-medium  text-red-500  text-xl -mt-2 ml-1 line-through">
              {product?.originalPrice}$
            </h4>
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
                  className="cursor-pointer"
                  onClick={() => dispatch(removeFromWishlist(product))}
                  color={click ? 'red' : '#333'}
                  title="Remove from wishlist"
                />
              ) : (
                <AiOutlineHeart
                  size={30}
                  className="cursor-pointer"
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
          <div className="flex items-center gap-4 py-4 ">
            <img
              src={`${backend_url}${product?.shop.avatar}`}
              alt=""
              className="w-14 h-14 rounded-full object-con"
            />
            <div>
              <h3 className="text-indigo-500">{product?.shop.name}</h3>
              <h3 className="mt-2"> ({product?.shop.ratings}) Ratings</h3>
            </div>
            <div className={`w-fit bg-[#000]  rounded-md py-4 px-6`}>
              <span className="text-[#fff] flex items-center">
                Send Message <AiOutlineMessage className="ml-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <ProductDetailsInfo data={product} />
    </>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);

  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded mt-3">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]'
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? <div className={`active_indicator`} /> : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]'
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? <div className={`active_indicator`} /> : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]'
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? <div className={`active_indicator`} /> : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data?.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data?.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}/${item.user.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={item?.rating} />
                  </div>
                  <p>{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data?.reviews.length === 0 && (
              <h5>No Reviews have for this product!</h5>
            )}
          </div>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block md:flex p-5">
          <div className="w-full md:w-[50%]">
            <div className="flex items-center">
              <img
                src={`${backend_url}`}
                className="w-[50px] h-[50px] rounded-full"
                alt=""
              />
              <div className="pl-3">
                <h3 className={`shop_name`}>{data?.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">
                  ({data?.shop?.ratings}) Ratings
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem
              cum quibusdam omnis a minima perspiciatis itaque magnam nesciunt,
              porro saepe aspernatur repudiandae iusto sapiente, esse accusamus
              eligendi! Vel, officia similique?
            </p>
          </div>
          <div className="w-full md:w-[50%] mt-5 md:mt-0 md:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on: <span className="font-[500]">14 March,2023</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products: <span className="font-[500]">1,223</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews: <span className="font-[500]">324</span>
              </h5>
              <Link to="/">
                <div className={`button !rounded-[4px] !h-[39.5px] mt-3`}>
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
