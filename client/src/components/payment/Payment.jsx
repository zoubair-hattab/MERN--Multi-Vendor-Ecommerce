import { set } from 'mongoose';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  return (
    <div className="container flex items-center flex-col gap-5">
      <div className="container   flex  justify-center  gap-4 flex-wrap">
        <ShippingInfo />
        <CardData />
      </div>
    </div>
  );
};

const ShippingInfo = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  return (
    <div className="w-full md:w-[60%] bg-white p-3 rounded-md flex flex-col gap-6 ">
      <div className="flex items-center gap-4 border-b pb-4">
        <div
          onClick={() => setStep(1)}
          className="w-6 h-6 bg-transparent rounded-full border-2 border-black flex items-center justify-center"
        >
          {step == 1 && (
            <div className="w-3 h-3   rounded-full bg-black  relative"></div>
          )}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
          Pay with Debit/credit card
        </h4>
      </div>

      {step === 1 && (
        <form className="flex py-3 flex-col gap-4 border-b pb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="">Cart Number</label>
                <input
                  type="text"
                  className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                />
              </div>
              <div className="sm:flex-1 flex flex-col gap-1">
                <label htmlFor="">Exp Date</label>
                <input
                  type="text"
                  className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap ">
              <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="">Name on Cart</label>
                <input
                  type="text"
                  className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label htmlFor="">Billing Address</label>
                <input
                  type="text"
                  className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <button className="py-3 px-4 font-medium bg-red-500 text-white rounded-md w-fit">
            Submit
          </button>
        </form>
      )}
      <div className="flex items-center gap-4 pb-4 border-b ">
        <div
          onClick={() => setStep(2)}
          className="w-6 h-6 bg-transparent rounded-full border-2 border-black flex items-center justify-center"
        >
          {step == 2 && (
            <div className="w-3 h-3 rounded-full bg-black  relative"></div>
          )}
        </div>
        <h4 className="text-[18px]  font-[600] text-[#000000b1]">
          Pay with Paypal
        </h4>
      </div>
      {step === 2 && (
        <form className="flex py-2 flex-col gap-4 border-b">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="">Paypal Email</label>
              <input
                type="text"
                className="py-1.5 px-2 border border-gary-600 focus:outline-none"
              />
            </div>
          </div>

          <button className="py-3 px-4 font-medium bg-red-500 text-white rounded-md w-fit">
            Submit
          </button>
        </form>
      )}
      <div className="flex items-center gap-4">
        <div
          onClick={() => setStep(3)}
          className="w-6 h-6 bg-transparent rounded-full border-2 border-black flex items-center justify-center"
        >
          {step == 3 && (
            <div className="w-3 h-3 rounded-full bg-black  relative"></div>
          )}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
          Cash on Delivery
        </h4>
      </div>
      {step == 3 && (
        <button
          onClick={() => navigate('/order/success/kkkckkck')}
          className="py-3 px-4 font-medium bg-red-500 text-white rounded-md w-fit"
        >
          Confirm
        </button>
      )}
    </div>
  );
};
const CardData = () => {
  return (
    <div className="w-full md:w-[30%] h-fit bg-white p-4 rounded-md">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p>subtotal:</p>
          <h3 className="font-medium">$2610.00</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>shipping:</p>
          <h3 className="font-medium">-</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>Discount:</p>
          <h3 className="font-medium">-</h3>
        </div>
        <hr className="bg-slate-400 w-full" />
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Counpoun code"
            className="border border-gray-400 rounded-sm p-2 focus:outline-none"
          />
          <button className="py-2 text-red-500 border border-red-500 rounded-sm">
            Apply code
          </button>
        </form>
      </div>
    </div>
  );
};
export default Payment;
