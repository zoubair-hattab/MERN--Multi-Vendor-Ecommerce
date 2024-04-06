import React from 'react';
import Header from '../components/layout/Header';
import Hero from '../components/hero/Hero';
import Featrue from '../components/feature/Featrue';
import SingleProduct from '../components/product/SingleProduct';
import { productData } from '../static/data';
import Event from '../components/event/Event';
import Footer from '../components/layout/Footer';
import { useSelector } from 'react-redux';
import PopularProduct from '../components/product/PopularProduct';

const HomePage = () => {
  const { product } = useSelector((state) => state.product);

  return (
    <div>
      <Header activateHeader={1} />
      <Hero />
      <Featrue />
      <div className="container py-16">
        <h2 className="font-semibold text-2xl">Best Seller</h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {product?.map((product, index) => (
            <SingleProduct product={product} key={index} />
          ))}
        </div>
      </div>
      <Event />
      <PopularProduct />
      <Footer />
    </div>
  );
};

export default HomePage;
