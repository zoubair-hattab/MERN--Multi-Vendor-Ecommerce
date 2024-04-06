import React from 'react';
import Checkout from '../components/checkout/Checkout';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CheckoutSteps from '../components/checkout/CheckoutSteps';

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <CheckoutSteps active={1} />
      <Checkout />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
