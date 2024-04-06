import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../components/product/ProductDetails';
import { productData } from '../static/data';
import Header from '../components/layout/Header';
import SingleProduct from '../components/product/SingleProduct';
import Footer from '../components/layout/Footer';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [singleProduct, setSingleProduct] = useState();
  const [relatedProduct, setReleatedProduct] = useState();
  const { product } = useSelector((state) => state.product);
  useEffect(() => {
    const data = product?.find((i) => i.name.replace(/ /g, '-') == name);
    const filterData = product?.filter(
      (item) => item.category == data.category
    );
    setReleatedProduct(filterData);
    setSingleProduct(data);
  }, [name]);
  //console.log(singleProduct);
  return (
    <>
      <Header />

      <div className="bg-white">
        <div className="container py-16">
          <ProductDetails product={singleProduct} />
        </div>
      </div>
      <div className="container py-16">
        <h3 className="text-xl font-bold my-4">Related Product</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {relatedProduct?.map((item) => (
            <SingleProduct product={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
