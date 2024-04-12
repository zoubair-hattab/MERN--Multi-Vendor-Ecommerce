import { set } from 'mongoose';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { urlServer } from '../../server';
import { removeFromCart } from '../../redux/reducers/cartReducer';
const Payment = () => {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const stripe = useStripe();
  const elements = useElements();
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const order = {
    cart: state?.cart,
    shippingAddress: state?.shippingAddress,
    user: currentUser && currentUser,
    totalPrice: state?.totalPrice,
  };
  const paymentData = {
    amount: Math.round(state?.totalPrice * 100),
  };
  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `${urlServer}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.message;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: 'Credit Card',
          };

          await axios
            .post(`${urlServer}/order/create-order`, order, {
              withCredentials: true,
            })
            .then((res) => {
              disptach(removeFromCart(null));
              navigate('/order/success');
              toast.success('Order successful!');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Sunflower',
            amount: {
              currency_code: 'USD',
              value: state?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: 'succeeded',
      type: 'Paypal',
    };

    await axios
      .post(`${urlServer}/order/create-order`, order, {
        withCredentials: true,
      })
      .then((res) => {
        disptach(removeFromCart(null));
        navigate('/order/success');
        toast.success('Order successful!');
      });
  };
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    order.paymentInfo = {
      type: 'Cash On Delivery',
    };

    await axios
      .post(`${urlServer}/order/create-order`, order, {
        withCredentials: true,
      })
      .then((res) => {
        disptach(removeFromCart(null));
        navigate('/order/success');
        toast.success('Order successful!');
      });
  };

  return (
    <div className="container flex items-center flex-col gap-5">
      <div className="container   flex  justify-center  gap-4 flex-wrap">
        <ShippingInfo
          user={currentUser}
          open={open}
          setOpen={setOpen}
          onApprove={onApprove}
          createOrder={createOrder}
          paymentHandler={paymentHandler}
          cashOnDeliveryHandler={cashOnDeliveryHandler}
        />
        <CardData state={state} />
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  return (
    <div className="w-full md:w-[60%] bg-white p-3 rounded-md flex flex-col gap-6 ">
      <div className="flex items-center gap-4 border-b pb-4">
        <div
          onClick={() => setStep(1)}
          className="w-6 h-6 bg-transparent rounded-full border-2 border-black flex items-center justify-center"
        >
          {step == 1 && (
            <div className="w-3 h-3   rounded-full bg-black  relative"></div>
          )}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
          Pay with Debit/credit card
        </h4>
      </div>

      {step === 1 && (
        <>
          <form
            onSubmit={paymentHandler}
            className="flex py-3 flex-col gap-4 border-b pb-4"
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="">Name On Card</label>
                  <input
                    type="text"
                    className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                  />
                </div>
                <div className="sm:flex-1 flex flex-col gap-1">
                  <label htmlFor="">Exp Date</label>
                  <CardExpiryElement
                    className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          lineHeight: 1.5,
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#444',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap ">
                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="">Card Number</label>
                  <CardNumberElement
                    className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          lineHeight: 1.5,
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#444',
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <label htmlFor="">CVV</label>
                  <CardCvcElement
                    className="py-1.5 px-2 border border-gary-600 focus:outline-none"
                    options={{
                      style: {
                        base: {
                          fontSize: '19px',
                          lineHeight: 1.5,
                          color: '#444',
                        },
                        empty: {
                          color: '#3a120a',
                          backgroundColor: 'transparent',
                          '::placeholder': {
                            color: '#444',
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <button className="py-3 px-4 font-medium bg-red-500 text-white rounded-md w-fit">
              Submit
            </button>
          </form>
        </>
      )}
      <div className="flex items-center gap-4 pb-4 border-b ">
        <div
          onClick={() => setStep(2)}
          className="w-6 h-6 bg-transparent rounded-full border-2 border-black flex items-center justify-center"
        >
          {step == 2 && (
            <div className="w-3 h-3 rounded-full bg-black  relative"></div>
          )}
        </div>
        <h4 className="text-[18px]  font-[600] text-[#000000b1]">
          Pay with Paypal
        </h4>
      </div>
      {step === 2 && (
        <>
          <button
            onClick={() => setOpen(true)}
            className="py-3 px-4 font-medium bg-red-500 text-white rounded-md w-fit"
          >
            pay Now
          </button>
          {open && (
            <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
              <div className="w-full 800px:w-[40%] h-screen 800px:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                <div className="w-full flex justify-end p-3">
                  <RxCross1
                    size={30}
                    className="cursor-pointer absolute top-3 right-3"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <PayPalScriptProvider
                  options={{
                    'client-id':
                      'Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn',
                  }}
                >
                  <PayPalButtons
                    style={{ layout: 'vertical' }}
                    onApprove={onApprove}
                    createOrder={createOrder}
                  />
                </PayPalScriptProvider>
              </div>
            </div>
          )}
        </>
      )}
      <div className="flex items-center gap-4">
        <div
          onClick={() => setStep(3)}
          className="w-6 h-6 bg-transparent rounded-full border-2 border-black flex items-center justify-center"
        >
          {step == 3 && (
            <div className="w-3 h-3 rounded-full bg-black  relative"></div>
          )}
        </div>
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
          Cash on Delivery
        </h4>
      </div>
      {step == 3 && (
        <button
          onClick={cashOnDeliveryHandler}
          className="py-3 px-4 font-medium bg-red-500 text-white rounded-md w-fit"
        >
          Confirm
        </button>
      )}
    </div>
  );
};
const CardData = ({ state }) => {
  return (
    <div className="w-full md:w-[30%] h-fit bg-white p-4 rounded-md">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <p>subtotal:</p>
          <h3 className="font-medium">{state.subTotalPrice}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>shipping:</p>
          <h3 className="font-medium">{state?.shippin || '-'}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>Discount:</p>
          <h3 className="font-medium">{state?.discountPrice || '-'}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>Total:</p>
          <h3 className="font-medium">{state?.totalPrice || '-'}</h3>
        </div>
      </div>
    </div>
  );
};
export default Payment;
