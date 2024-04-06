import React, { useEffect, useState } from 'react';
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { CiMoneyBill, CiSettings } from 'react-icons/ci';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const loaction = useLocation();

  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <ul className="bg-white  dashboard py-6 px-3 flex flex-col gap-6">
      <li>
        <Link
          to="?tab=dashboard"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            (tab === 'dashboard' || !tab) && 'text-red-500'
          } `}
        >
          <RxDashboard size={30} />
          <span>Dashboard</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=all-orders"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'all-orders' && 'text-red-500'
          } `}
        >
          <FiShoppingBag size={30} />
          <span>All Orders</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=all-products"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'all-products' && 'text-red-500'
          } `}
        >
          <FiPackage size={30} />
          <span>All Products</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=create-product"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'create-product' && 'text-red-500'
          } `}
        >
          <AiOutlineFolderAdd size={30} />
          <span>Create Product</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=all-events"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'all-events' && 'text-red-500'
          } `}
        >
          <MdOutlineLocalOffer size={30} />
          <span>All Events</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=create-event"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'create-event' && 'text-red-500'
          } `}
        >
          <VscNewFile size={30} />
          <span>Create Event</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=withdraw-money"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'withdraw-money' && 'text-red-500'
          } `}
        >
          <CiMoneyBill size={30} />
          <span>Withdraw Money</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=inbox"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'inbox' && 'text-red-500'
          } `}
        >
          <BiMessageSquareDetail size={30} />
          <span>Shop Inbox</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=discount-codes"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'discount-codes' && 'text-red-500'
          } `}
        >
          <AiOutlineGift size={30} />
          <span>Discount Codes</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=refunds"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'refunds' && 'text-red-500'
          } `}
        >
          <HiOutlineReceiptRefund size={30} />
          <span> Refunds</span>
        </Link>
      </li>

      <li>
        <Link
          to="?tab=sittings"
          className={`flex items-center gap-3 text-base text-gray-6 cursor-pointer ${
            tab === 'sittings' && 'text-red-500'
          } `}
        >
          <CiSettings size={30} />
          <span>Sittings</span>
        </Link>
      </li>
    </ul>
  );
};

export default SideBar;
