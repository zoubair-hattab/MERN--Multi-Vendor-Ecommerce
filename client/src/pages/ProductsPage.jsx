import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import SingleProduct from '../components/product/SingleProduct';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const ProductsPage = () => {
  const { product } = useSelector((state) => state.product);

  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get('category');
  const [data, setData] = useState([]);
  //console.log(categoryData);

  useEffect(() => {
    if (categoryData === null) {
      const d = product;
      setData(d);
    } else {
      const d =
        product &&
        product.filter(
          (i) => i.category.toLowerCase().replace(/ /g, '-') === categoryData
        );
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [categoryData]);

  return (
    <div>
      <Header activateHeader={3} />
      <div className="container py-16">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {data?.map((product, index) => (
            <SingleProduct product={product} key={product?._id} />
          ))}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
