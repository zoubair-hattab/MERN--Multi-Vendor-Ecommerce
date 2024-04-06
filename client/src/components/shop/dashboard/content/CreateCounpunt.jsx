import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { urlServer } from '../../../../server';
const CreateCounpunt = ({ setClose, coupon, setCoupon }) => {
  const [counpuntForm, setCounpuntForm] = useState({});
  const handleChangeInput = (e) => {
    setCounpuntForm({ ...counpuntForm, [e.target.id]: e.target.value });
  };
  const { currentSeller } = useSelector((state) => state.seller);

  const [products, setProducts] = useState([]);
  const { product } = useSelector((state) => state.product);
  useEffect(() => {
    //console.log(product);
    const productfiltred = product?.filter(
      (item) => item.shopId == currentSeller._id
    );
    setProducts(productfiltred);
  }, [product]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${urlServer}/coupon/create-coupoun`,
        {
          ...counpuntForm,

          shopId: currentSeller._id,
        },
        { withCredentials: true }
      );
      setCoupon([...coupon, data.message]);
      setClose(false);
    } catch (error) {
      //console.log(error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] flex items-center justify-center">
      <div className="fixed max-w-lg w-full bg-white p-3 rounded-md">
        <IoMdClose
          size={25}
          className="absolute top-2 right-2"
          onClick={() => setClose(false)}
        />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h3 className="mt-6 text-center font-medium text-xl">
            Create Coupon code
          </h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Discount Percentenge : </label>
            <input
              type="number"
              id="value"
              className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Min Amount : </label>
            <input
              type="number"
              id="minAmount"
              className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Max Amount : </label>
            <input
              type="number"
              id="maxAmount"
              className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
              onChange={handleChangeInput}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Select Product : </label>
            <select
              onChange={handleChangeInput}
              id="selectedProducts"
              className="py-2 focus:outline-none border border-gray-300"
            >
              <option value="Choose your selected products">
                Choose a selected product
              </option>
              {products &&
                products.map((i) => (
                  <option value={i.name} key={i.name}>
                    {i.name}
                  </option>
                ))}
            </select>
          </div>
          <button className="w-full py-2 border border-gray-400">
            Create Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCounpunt;
