import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { urlServer } from '../../../server';
import SingleProduct from '../../product/SingleProduct';

const ShopData = ({ seller }) => {
  const [active, setActive] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const loadEvent = async () => {
      const { data } = await axios.get(
        `${urlServer}/product/get-all-product-by-shop/${id}`
      );
      setProduct(data?.message);
    };
    loadEvent();
  }, [id]);

  return (
    <div className="w-full">
      <div className=" flex  justify-between">
        <div className="self-start mr-auto flex items-center gap-4 py-4">
          <p
            className={`font-medium text-xl cursor-pointer ${
              active === 1 && 'text-red-500'
            }`}
            onClick={() => setActive(1)}
          >
            Shop Products
          </p>
          <p
            className={`font-medium text-xl cursor-pointer ${
              active === 2 && 'text-red-500'
            }`}
            onClick={() => setActive(2)}
          >
            Running Events
          </p>
          <p
            className={`font-medium text-xl cursor-pointer ${
              active === 3 && 'text-red-500'
            }`}
            onClick={() => setActive(3)}
          >
            Shop Reviews
          </p>
        </div>
        {seller && (
          <div className="py-4">
            <Link
              to="/shop/dashboard"
              className="self-start block py-3 px-4 bg-black text-white rounded-md font-medium"
            >
              Go To Dashboard
            </Link>
          </div>
        )}
      </div>
      {active === 1 && (
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {product?.map((product, index) => (
            <SingleProduct product={product} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopData;
