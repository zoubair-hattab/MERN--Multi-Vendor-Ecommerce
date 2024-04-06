import React from 'react';
import { PiVanThin } from 'react-icons/pi';
import { GiTakeMyMoney } from 'react-icons/gi';
import { MdSupportAgent } from 'react-icons/md';
function Featrue() {
  return (
    <div className="bg-white container py-2  mt-10 rounded-md ">
      <div className="lg:w-8/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3 lg:gap-4 mx-auto justify-center">
        <div className="border border-indigo-500 py-5 px-3 flex items-center gap-4 rounded-md">
          <PiVanThin size={50} color="blue" />
          <div>
            <h3 className="font-medium capitalize text-lg">Free Shopping</h3>
            <p className="text-gray-500 text-xs lg:text-sm ">Order over $200</p>
          </div>
        </div>
        <div className="border border-indigo-500 py-5 px-3 flex items-center gap-4 rounded-md ">
          <GiTakeMyMoney size={50} color="blue" />

          <div>
            <h4 className="font-medium capitalize text-lg">Money returns</h4>
            <p className="text-gray-500 text-xs lg:text-sm">
              30 Days money return
            </p>
          </div>
        </div>
        <div className="border border-indigo-500 py-5 px-3 flex items-center gap-4 rounded-md">
          <MdSupportAgent size={50} color="blue" />

          <div>
            <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
            <p className="text-gray-500 text-xs lg:text-sm">Customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featrue;
