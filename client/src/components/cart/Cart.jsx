import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoBagHandleOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { backend_url } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/reducers/cartReducer';

const Cart = ({ setCartOpen }) => {
  const { cart } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const removeItemHandler = (data) => {
    dispatch(removeFromCart(data));
  };
  const addItemHandler = (data) => {
    dispatch(addToCart(data));
  };
  const totalPrice = cart?.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  return (
    <div className="overflow-auto fixed top-0 right-0 max-w-[380px] shadow-sm w-full h-screen bg-white z-[999]">
      <div className="min-h-full  flex flex-col justify-between">
        <div className="flex w-full  pt-5 pr-5flex  justify-end p-3">
          <IoMdClose size={28} onClick={() => setCartOpen(false)} />
        </div>
        <div className="mb-auto divide-y divide-gray-200 ">
          <div className="flex items-center gap-2 p-3">
            <IoBagHandleOutline size={25} />
            <h3 className="text-gray-600 text-lg  w-full  mr-2 ">
              <span>{cart?.length}</span> Items
            </h3>
          </div>

          {cart.length === 0 ? (
            <p className="py-20 text-gray-400 text-xl flex items-center justify-center">
              There is no Item
            </p>
          ) : (
            cart?.map((item) => (
              <SingalCart
                item={item}
                key={item._id}
                dispatch={dispatch}
                removeItemHandler={removeItemHandler}
                addItemHandler={addItemHandler}
              />
            ))
          )}
        </div>
        <div className="px-3">
          <Link
            to="/checkout"
            className="block text-center rounded-md mb-2  w-full bg-red-500 py-2 text-white font-medium"
          >
            Chekout Now ${totalPrice}
          </Link>
        </div>
      </div>
    </div>
  );
};
const SingalCart = ({ item, removeItemHandler, addItemHandler }) => {
  const [counter, setCounter] = useState(item?.qty);
  const incriment = (item) => {
    if (item?.stock >= counter) {
      setCounter(counter + 1);
      addItemHandler({ ...item, qty: counter + 1 });
    }
  };
  const decriment = (item) => {
    if (counter > 1) {
      setCounter(counter - 1);
      addItemHandler({ ...item, qty: counter - 1 });
    }
  };
  return (
    <div className="flex items-center justify-between py-4 px-3">
      <div className="flex flex-col ">
        <button
          className="w-6 h-6 text-white bg-red-500 rounded-full"
          onClick={() => incriment(item)}
        >
          +
        </button>
        <span className=" w-6 h-6  flex items-center justify-center">
          {item?.qty}
        </span>
        <button
          className="w-6 h-6 text-white bg-teal-500 rounded-full"
          onClick={() => decriment(item)}
        >
          -
        </button>
      </div>
      <img
        src={`${backend_url}${item?.images[0]}`}
        alt=""
        className="w-14 h-1w-14 object-cover"
      />
      <div className="flex flex-col gap-2">
        <p className="text-sm tetx-gray-500">{item?.name}</p>
        <p className="text-sm text-gray-400">
          USD {item?.discountPrice} * {counter}
        </p>
        <p className="text-lg font-medium text-red-500">
          $ {item.discountPrice * counter}
        </p>
      </div>
      <IoMdClose
        size={20}
        className="text-gray-500"
        onClick={() => removeItemHandler(item)}
      />
    </div>
  );
};
export default Cart;
