import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SingleProduct from '../components/product/SingleProduct';
import { useSelector } from 'react-redux';

const BestSellerPage = () => {
  const { product } = useSelector((state) => state.product);
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = product;
    //&& product?.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);
  return (
    <div>
      <Header activateHeader={2} />
      <div className="container my-14">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data?.map((product) => (
            <SingleProduct product={product} key={product._id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellerPage;
