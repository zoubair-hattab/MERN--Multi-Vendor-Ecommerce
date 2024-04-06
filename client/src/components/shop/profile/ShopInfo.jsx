import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { backend_url, urlServer } from '../../../server';
import { toast } from 'react-toastify';

const ShopInfo = ({ seller }) => {
  const [shop, setShop] = useState({});
  const { id } = useParams();
  //console.log(id);
  useEffect(() => {
    const loadShop = async () => {
      try {
        const { data } = await axios.get(`${urlServer}/shop/get-info/${id}`);
        setShop(data.message);
        //console.log(data);
      } catch (error) {
        //console.log(error);
        toast.error(error?.response.data.message);
      }
    };
    loadShop();
  }, [id]);
  const handleLogout = async () => {
    await axios.post(
      `${urlServer}/auth/shop/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    window.location.reload();
  };
  //console.log(shop);
  return (
    <ul
      className="max-w-[320px] h-[750px] w-full flex  
     justify-center flex-col gap-4 py-6 px-3 bg-white rounded-md"
    >
      <li>
        <img
          src={`${backend_url}${shop.avatar}`}
          alt=""
          className="w-36 h-36 rounded-full object-cover mx-auto "
        />
      </li>
      <li className="font-medium flex flex-col gap-2">
        <p>Address</p>
        <p className="text-gray-500">{shop?.address}</p>
      </li>
      <li className="font-medium flex flex-col gap-2">
        <p>Phone Number</p>
        <p className="text-gray-500">{shop.phoneNumber}</p>
      </li>
      <li className="font-medium flex flex-col gap-2">
        <p>Total Products</p>
        <p className="text-gray-500">{}</p>
      </li>
      <li className="font-medium flex flex-col gap-2">
        <p>Shop Ratings</p>
        <p className="text-gray-500">(4/5)</p>
      </li>
      <li className="font-medium flex flex-col gap-2">Join on</li>
      {seller?._id == id && (
        <>
          <li className="bg-black text-white py-2 text-center rounded-md">
            Edit Shops
          </li>
          <li
            className="bg-black text-white py-2 text-center rounded-md"
            onClick={handleLogout}
          >
            Logout
          </li>
        </>
      )}
    </ul>
  );
};

export default ShopInfo;
