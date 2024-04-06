import React, { useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex items-center flex-col gap-5">
      <div className="container   flex  justify-center  gap-4 flex-wrap">
        <ShippingInfo />
        <CardData />
      </div>
      <button
        onClick={() => navigate('/payment')}
        className="py-3 bg-black px-6 font-medium rounded-md mx-auto text-white uppercase"
      >
        GO To Payment
      </button>
    </div>
  );
};

const ShippingInfo = () => {
  const [country, setCountry] = useState('');

  return (
    <div className="w-full md:w-[60%] bg-white p-3 rounded-md">
      <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
      <form className="flex  flex-col gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                className="py-1.5 px-2 border border-gary-600 focus:outline-none"
              />
            </div>
            <div className="sm:flex-1 flex flex-col gap-1">
              <label htmlFor="">Email Address</label>
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
              <label htmlFor="">Phone Number</label>
              <input
                type="text"
                className="py-1.5 px-2 border border-gary-600 focus:outline-none"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="">Zip Code</label>
              <input
                type="text"
                className="py-1.5 px-2 border border-gary-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="">Country</label>
            <select
              className=" border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="">State</label>
            <select className="w-[95%] border h-[40px] rounded-[5px]">
              <option className="block pb-2" value="">
                Choose your City
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="">Address1</label>
            <input
              type="text"
              className="py-1.5 px-2 border border-gary-600 focus:outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="">Address2</label>
            <input
              type="text"
              className="py-1.5 px-2 border border-gary-600 focus:outline-none"
            />
          </div>
        </div>
      </form>
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
export default Checkout;
