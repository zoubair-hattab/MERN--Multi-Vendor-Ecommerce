import React, { useState } from 'react';

const CheckoutSteps = ({ active }) => {
  return (
    <div className="px-3 w-full items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto flex items-center flex-wrap">
        <button
          className={`px-6 py-3 rounded-[25px]  font-medium${
            active >= 1
              ? ' bg-red-500 text-white '
              : ' text-gray-700 bg-[#FDE1E6]'
          }`}
        >
          1.Shipping
        </button>
        <div
          className={`w-[70px] h-[4px] ${
            active >= 1 ? ' bg-red-500' : 'bg-[#FDE1E6]'
          }`}
        ></div>
        <button
          className={`px-6 py-3 rounded-[25px]  font-medium${
            active >= 2
              ? ' bg-red-500 text-white '
              : ' text-gray-700 bg-[#FDE1E6]'
          }`}
        >
          2.Payment
        </button>
        <div
          className={`w-[70px] h-[4px] ${
            active >= 2 ? ' bg-red-500' : 'bg-[#FDE1E6]'
          }`}
        ></div>
        <button
          className={`px-6 py-3 rounded-[25px]  font-medium${
            active >= 3
              ? ' bg-red-500 text-white '
              : ' text-gray-700 bg-[#FDE1E6]'
          }`}
        >
          3.Success
        </button>
      </div>
    </div>
  );
};

export default CheckoutSteps;
