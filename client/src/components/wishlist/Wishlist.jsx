import React, { useState } from 'react';
import { BiHeart } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import { IoBagHandleOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { removeFromWishlist } from '../../redux/reducers/wishlistReducer';
import { addToCart } from '../../redux/reducers/cartReducer';

const Wishlist = ({ setCartOpen }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const removeHandle = (data) => {
    dispatch(removeFromWishlist(data));
  };
  const addItemHandler = (data) => {
    dispatch(addToCart({ ...data, qty: 1 }));
    dispatch(removeFromWishlist(data));
  };
  return (
    <div className="overflow-auto fixed top-0 right-0 max-w-[380px] shadow-sm w-full h-screen bg-white z-[999]">
      <div className="min-h-full  flex flex-col justify-between">
        <div className="flex w-full  pt-5 pr-5flex  justify-end p-3">
          <IoMdClose size={28} onClick={() => setCartOpen(false)} />
        </div>
        <div className="mb-auto divide-y divide-gray-200 ">
          <div className="flex items-center gap-2 p-3">
            <BiHeart size={25} />
            <h3 className="text-gray-600 text-lg  w-full  mr-2 ">
              <span>{wishlist?.length}</span> Items
            </h3>
          </div>

          {wishlist.length > 0 ? (
            wishlist?.map((item) => (
              <SingalCart
                item={item}
                key={item?._id}
                removeHandle={removeHandle}
                addItemHandler={addItemHandler}
              />
            ))
          ) : (
            <p className="py-20 flex items-center justify-center text-xl text-gray-400">
              There is no item here
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
const SingalCart = ({ item, removeHandle, addItemHandler }) => {
  return (
    <div className="flex items-center justify-between py-4 px-3">
      <IoMdClose
        size={20}
        className="text-gray-500"
        onClick={() => removeHandle(item)}
      />

      <img
        src={`${backend_url}${item?.images[0]}`}
        alt=""
        className="w-14 h-1w-14 object-cover"
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm tetx-gray-500">{item?.name}</p>
        <p className="text-sm text-red-500 font-medium">
          USD {item?.discountPrice}
        </p>
      </div>
      <IoBagHandleOutline
        size={25}
        className="text-gray-500"
        onClick={() => addItemHandler(item)}
      />
    </div>
  );
};
export default Wishlist;
