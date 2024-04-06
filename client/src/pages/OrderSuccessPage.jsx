import React from 'react';
import Header from '../components/layout/Header';
import CheckoutSteps from '../components/checkout/CheckoutSteps';
import Checkout from '../components/checkout/Checkout';
import Footer from '../components/layout/Footer';
import Lottie from 'react-lottie-player';
import animationData from '../assets/animations/107043-success.json';

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};
export default OrderSuccessPage;
const Success = () => {
  return (
    <div>
      <Lottie
        loop={false}
        animationData={animationData}
        play
        speed={0.5}
        style={{ width: 300, height: 300, marginInline: 'auto' }}
      />

      <h5 className="text-center mb-7 text-[26px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};
