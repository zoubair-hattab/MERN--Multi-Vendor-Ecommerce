import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { productData } from '../../static/data';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { Link } from 'react-router-dom';

const Search = ({ hidden, block }) => {
  const { product } = useSelector((state) => state.product);
  const [item, setItem] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (item) {
      const value = product?.filter((product) =>
        product?.name.toLowerCase().includes(item?.toLowerCase())
      );
      //console.log(value);
      setProducts(value);
    } else {
      setProducts([]);
    }
  }, [item]);
  return (
    <div
      className={`relative ${hidden} ${block} mb-5 sm:mb-0 sm:max-w-[450px] md:max-w-[400px] lg:max-w-lg xl:max-w-4xl w-full z-[999]`}
    >
      <input
        type="text"
        className="w-full py-2 px-3 rounded-md text-gray-600 border-2 border-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        onChange={(e) => setItem(e.target.value)}
      />
      <FaSearch
        size={20}
        color="gray"
        className="absolute top-[50%] right-2 -translate-y-[50%]"
      />
      <ul className="absolute top-full w-full    divide-y  divide-gray-200  bg-white z-50">
        {products &&
          products?.map((item) => (
            <li key={item.id} className="">
              <Link
                to={`/product/${item?.name?.replace(/ /g, '-')}`}
                className="p-2 flex items-center gap-4 hover:bg-gray-100 transition-all duration-300 text-sm text-gray-500"
              >
                <img
                  src={`${backend_url}${item.images}`}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <p className="line-clamp-2">{item.name}</p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Search;
