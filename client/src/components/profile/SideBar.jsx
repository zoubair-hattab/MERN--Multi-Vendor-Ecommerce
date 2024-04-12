import React from 'react';
import { CiUser } from 'react-icons/ci';
import { BsBagCheck } from 'react-icons/bs';
import { RiRefund2Fill } from 'react-icons/ri';
import { AiOutlineMessage } from 'react-icons/ai';
import { MdTrackChanges } from 'react-icons/md';
import { MdOutlinePayment } from 'react-icons/md';
import { LiaAddressCard } from 'react-icons/lia';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import axios from 'axios';
import { urlServer } from '../../server';
import { useNavigate } from 'react-router-dom';
const SideBar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const loagout = async () => {
    try {
      const { data } = await axios.post(
        `${urlServer}/auth/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data?.message);
      window.location.reload();
    } catch (error) {
      toast.error(error?.response.data.massage);
    }
  };
  return (
    <div className="bg-white  h-[100%]   w-[40px] sm:w-[50px] md:w-full ">
      <ul className="flex flex-col gap-8  items-center md:items-start py-5   md:px-3">
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 1 && 'text-red-500'
          }`}
          onClick={() => setActive(1)}
        >
          <CiUser size={25} />
          <span className=" hidden md:block">Profile</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 2 && 'text-red-500'
          }`}
          onClick={() => setActive(2)}
        >
          <BsBagCheck size={25} />
          <span className="hidden md:block">Orders</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 3 && 'text-red-500'
          }`}
          onClick={() => setActive(3)}
        >
          <RiRefund2Fill size={25} />
          <span className="hidden md:block">Refunds</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 4 && 'text-red-500'
          }`}
          onClick={() => setActive(4)}
        >
          <AiOutlineMessage size={25} />
          <span className="hidden md:block">Inbox</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 5 && 'text-red-500'
          }`}
          onClick={() => setActive(5)}
        >
          <MdTrackChanges size={25} />
          <span className="hidden md:block">Track Order</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 6 && 'text-red-500'
          }`}
          onClick={() => setActive(6)}
        >
          <MdOutlinePayment size={25} />
          <span className="hidden md:block">Payment Methods</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 7 && 'text-red-500'
          }`}
          onClick={() => setActive(7)}
        >
          <LiaAddressCard size={25} />
          <span className="hidden md:block">Address</span>
        </li>
        <li
          className={`flex items-center gap-3 cursor-pointer ${
            active === 8 && 'text-red-500'
          }`}
          onClick={() => {
            setActive(8);
            loagout();
          }}
        >
          <RiLogoutCircleLine size={25} />
          <span className="hidden md:block">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
