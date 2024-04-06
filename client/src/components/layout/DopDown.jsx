import React, { useState } from 'react';
import { categoriesData } from '../../static/data';
import { BiMenuAltLeft, BiMenuAltRight } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const DopDown = ({ hidden, block }) => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <ul
      className={`lg:max-w-[270px] ${hidden} ${block}  h-fit lg:h-[60px] w-full bg-white px-3 rounded-t-md relative top-[5px] lg:z-50`}
    >
      <li className="py-[13px] ">
        <div
          className=" flex items-center justify-between gap-1 relative"
          onClick={() => setDropDown(!dropDown)}
        >
          <BiMenuAltLeft size={30} className="hidden lg:block" />
          <span className="mr-auto text-base text-gray-700 font-semibold">
            All Categories
          </span>
          <FaChevronDown size={15} />
        </div>
        <ul
          className={`${
            dropDown ? 'flex' : 'hidden'
          }   flex-col gap-1 py-2 static lg:absolute top-full left-0 bg-white w-full z-index-50 lg:shadow-md rounded-b-md`}
        >
          {categoriesData &&
            categoriesData.map((item) => (
              <li
                onClick={() => setDropDown(false)}
                key={item.id}
                className=" hover:bg-slate-200 transition-all duration-300 "
              >
                <Link
                  to={`/products?category=${item?.title
                    .toLowerCase()
                    .replace(/ /g, '-')}`}
                  className="px-4 py-3 flex items-center gap-2 "
                >
                  <img
                    src={item?.image_Url}
                    alt=""
                    className="w-[30px]  h-[30px] rounded-full object-cover "
                  />
                  <span className="text-base text-gray-600 font-medium line-clamp-1">
                    {item?.title}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </li>
    </ul>
  );
};

export default DopDown;
