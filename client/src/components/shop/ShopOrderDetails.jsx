import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { backend_url, urlServer } from '../../server';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BsFillBagFill } from 'react-icons/bs';

const ShopOrderDetails = () => {
  const [data, setData] = useState();
  const { id } = useParams();
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await axios.get(
          `${urlServer}/order/get-all-orders-by-shop`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
        const findOrder = res?.data?.message?.find((ord) => ord._id == id);
        setData(findOrder);
      } catch (error) {
        toast.error(error?.response?.data.message);
      }
    };
    loadOrders();
  }, [id]);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${urlServer}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success('Order updated!');
        navigate('/shop/dashboard?tab=all-orders');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${urlServer}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success('Order updated!');
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
      });
  };
  return (
    <div className={`container py-16`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`py-2 px-3  bg-[#c5bdbe] rounded-[4px] text-[#311a1e] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart?.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full md:flex items-center">
        <div className="w-full md:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              ' ' +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full md:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{' '}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : 'Not Paid'}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== 'Processing refund' &&
        data?.status !== 'Refund Success' && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="py-4 w-[200px] ml-2 mt-2 border  rounded-[5px]"
          >
            {[
              'Processing',
              'Transferred to delivery partner',
              'Shipping',
              'Received',
              'On the way',
              'Delivered',
            ]
              .slice(
                [
                  'Processing',
                  'Transferred to delivery partner',
                  'Shipping',
                  'Received',
                  'On the way',
                  'Delivered',
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="py-4 w-[200px] ml-2 mt-2 border  rounded-[5px]"
      >
        {['Processing refund', 'Refund Success']
          .slice(['Processing refund', 'Refund Success'].indexOf(data?.status))
          .map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
      </select>

      <div
        className={`px-4 py-2 w-fit mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={
          data?.status !== 'Processing refund'
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
};

export default ShopOrderDetails;
