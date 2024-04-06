import React from 'react';
import SingleProduct from './SingleProduct';
import { useSelector } from 'react-redux';

const PopularProduct = () => {
  const { product } = useSelector((state) => state.product);

  return (
    <div className="container py-4 ">
      <h2 className="font-semibold text-2xl mb-6">Popular Product</h2>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {product?.map((product) => (
          <SingleProduct product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default PopularProduct;
