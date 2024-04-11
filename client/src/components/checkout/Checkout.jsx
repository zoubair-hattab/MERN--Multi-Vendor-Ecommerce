import React, { useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { urlServer } from '../../server';
import { toast } from 'react-toastify';
import axios from 'axios';
const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  let shipping = 0;
  // this is shipping cost variable
  if (subTotalPrice < 300) {
    shipping = subTotalPrice * 0.1;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const name = couponCode;

      const { data } = await axios.get(
        `${urlServer}/coupon/get-all-coupoun-by-name/${name}`
      );
      const shopId = data?.message.shopId;
      const couponCodeValue = data?.message.value;
      if (data?.message) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error('Coupon code is not valid for this shop');
          setCouponCode('');
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );

          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(data?.message);
          setCouponCode('');
        }
        if (data?.message === null) {
          toast.error("Coupon code doesn't exists!");
          setCouponCode('');
        }
      }
    } catch (error) {
      toast.error(error?.response.data.message);
      setDiscountPrice('');
      setCouponCodeData('');
      setCouponCode('');
    }
  };

  const discountPercentenge = couponCodeData ? discountPrice : '';

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  const paymentSubmit = () => {
    if (
      address1 === '' ||
      address2 === '' ||
      zipCode === null ||
      country === '' ||
      city === ''
    ) {
      toast.error('Please choose your delivery address!');
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        currentUser,
      };
      navigate('/payment', { state: orderData });
    }
  };

  return (
    <div className="container flex items-center flex-col gap-5">
      <div className="container   flex  justify-center  gap-4 flex-wrap">
        <ShippingInfo
          currentUser={currentUser}
          country={country}
          city={city}
          userInfo={userInfo}
          address1={address1}
          address2={address2}
          zipCode={zipCode}
          setCountry={setCountry}
          setCity={setCity}
          setUserInfo={setUserInfo}
          setAddress1={setAddress1}
          setAddress2={setAddress2}
          setZipCode={setZipCode}
        />

        <CardData
          handleSubmit={handleSubmit}
          totalPrice={totalPrice}
          shipping={shipping}
          subTotalPrice={subTotalPrice}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          discountPercentenge={discountPercentenge}
        />
      </div>
      <button
        onClick={paymentSubmit}
        className="py-3 bg-black px-6 font-medium rounded-md mx-auto text-white uppercase"
      >
        GO To Payment
      </button>
    </div>
  );
};

const ShippingInfo = ({
  currentUser,
  country,
  city,

  userInfo,
  address1,
  address2,
  zipCode,
  setCountry,
  setCity,
  setUserInfo,
  setAddress1,
  setAddress2,
  setZipCode,
}) => {
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
                defaultValue={currentUser?.name}
              />
            </div>
            <div className="sm:flex-1 flex flex-col gap-1">
              <label htmlFor="">Email Address</label>
              <input
                type="text"
                className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                defaultValue={currentUser?.email}
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
                defaultValue={currentUser?.phoneNumber}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <label htmlFor="">Zip Code</label>
              <input
                type="text"
                className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                defaultValue={zipCode}
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
            <select
              value={city}
              className="w-[95%] border h-[40px] rounded-[5px]"
            >
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
              defaultValue={address1}
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <label htmlFor="">Address2</label>
            <input
              type="text"
              className="py-1.5 px-2 border border-gary-600 focus:outline-none"
              defaultValue={address2}
            />
          </div>
        </div>
      </form>
      <h5
        onClick={() => setUserInfo(!userInfo)}
        className="text-lg text-gray-600 mt-3"
      >
        Choose from save address
      </h5>
      {userInfo &&
        currentUser?.addresses.map((item) => (
          <div key={item._id} className="flex items-center gap-2 mt-3">
            <input
              type="radio"
              name="item"
              value={item.addressType}
              onClick={() =>
                setAddress1(item.address1) ||
                setAddress2(item.address2) ||
                setZipCode(item.zipCode) ||
                setCountry(item.country) ||
                setCity(item.city)
              }
            />
            <h2>{item.addressType}</h2>
          </div>
        ))}
    </div>
  );
};
const CardData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
}) => {
  return (
    <div className="w-full md:w-[30%] h-fit bg-white p-4 rounded-md">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p>subtotal:</p>
          <h3 className="font-medium">${subTotalPrice}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>shipping:</p>
          <h3 className="font-medium">${shipping.toFixed(2)}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>Discount:</p>
          <h3 className="font-medium">
            {discountPercentenge ? '$' + discountPercentenge.toString() : '-'}
          </h3>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>

        <hr className="bg-slate-400 w-full" />
        <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Counpoun code"
            className="border border-gray-400 rounded-sm p-2 focus:outline-none"
            onChange={(e) => setCouponCode(e.target.value)}
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
