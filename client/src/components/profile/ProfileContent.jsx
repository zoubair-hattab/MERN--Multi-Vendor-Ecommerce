import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backend_url, urlServer } from '../../server';
import {
  MdClose,
  MdOutlineAddAPhoto,
  MdOutlineTrackChanges,
} from 'react-icons/md';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from 'react-icons/ai';
import {
  updateUserFail,
  updateUserStart,
  updateUserSuccess,
} from '../../redux/reducers/userReducer';
import { Country, State } from 'country-state-city';
const ProfileContent = ({ active }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userForm, setUserForm] = useState({});

  const fileRef = useRef();
  const handleChnageInput = (e) => {
    setUserForm({
      ...userForm,
      [e.target.id]: e.target.value,
    });
  };
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (file) {
        formData.append('image', file);
      }
      if (userForm?.name) {
        formData.append('name', userForm?.name);
      }
      if (userForm?.email) {
        formData.append('email', userForm?.email);
      }

      formData.append('phoneNumber', userForm?.phoneNumber);

      formData.append('password', userForm?.password);

      dispatch(updateUserStart());
      const { data } = await axios.put(`${urlServer}/user/update`, formData, {
        withCredentials: true,
      });
      dispatch(updateUserSuccess(data.message));
    } catch (error) {
      console.log(error);
      dispatch(updateUserFail(error.message));
    }
  };
  return (
    <>
      {active == 1 && (
        <form className="w-full flex flex-col gap-6" onSubmit={handelSubmit}>
          <div className="w-32 h-32 relative mx-auto border-2 border-teal-500 rounded-full ">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : `${backend_url}${currentUser?.avatar}`
              }
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
            <MdOutlineAddAPhoto
              size={32}
              className="w-[35px] h-[35px] p-1 absolute bg-[#E3E9EE] rounded-full  right-0 bottom-2 z-10 "
              onClick={() => fileRef.current.click()}
            />
          </div>
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex-auto flex flex-col gap-1">
              <label htmlFor="c">Full Name</label>
              <input
                type="text"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                defaultValue={currentUser?.name}
                id="name"
                onChange={handleChnageInput}
              />
            </div>
            <div className="flex-auto flex flex-col gap-1">
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                defaultValue={currentUser?.email}
                id="email"
                onChange={handleChnageInput}
              />
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex-auto flex flex-col gap-1">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                id="phoneNumber"
                onChange={handleChnageInput}
                defaultValue={currentUser?.phoneNumber}
              />
            </div>
            <div className="flex-auto flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                id="password"
                onChange={handleChnageInput}
              />
            </div>
          </div>

          <button className="py-2 px-8 border w-fit border-indigo-500 rounded-md text-indigo-500">
            Update
          </button>
        </form>
      )}
      {active == 2 && (
        <div>
          <AllOrders />
        </div>
      )}
      {active == 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}
      {active == 4 && <div>nothing</div>}
      {active == 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {active == 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}
      {active == 7 && (
        <div>
          <Address />
        </div>
      )}
    </>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: '7463hvbfbhfbrtr28820221',
      orderItems: [
        {
          name: 'Iphone 14 pro max',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: '7463hvbfbhfbrtr28820221',
      orderItems: [
        {
          name: 'Iphone 14 pro max',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: '7463hvbfbhfbrtr28820221',
      orderItems: [
        {
          name: 'Iphone 14 pro max',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: ' ',
      flex: 1,
      minWidth: 130,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`py-2 px-5 bg-black text-white !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-min md:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600] text-[12px] md:text-[unset]">
            Shahriar Sajeeb
          </h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="text-[12px] md:text-[unset]">1234 **** *** ****</h6>
          <h5 className="pl-6 text-[12px] md:text-[unset]">08/2022</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [formAddress, setFormAddress] = useState({});
  const addressType = [
    { name: 'Default' },
    { name: 'Home' },
    { name: 'Office' },
  ];
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          onClick={() => setOpen(true)}
          className={`cursor-pointer py-2 px-5 bg-black text-white !rounded-md`}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-min md:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <h5 className="pl-5 font-[600]">Default</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="text-[12px] md:text-[unset]">
            494 Erdman Pasaage, New Zoietown, Paraguay
          </h6>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="text-[12px] md:text-[unset]">(213) 840-9416</h6>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-[#00000026] z-[99999] flex items-center justify-center">
          <form className="max-w-lg w-full h-[60%] bg-white overflow-y-auto shadow-md rounded-md py-6 px-3 flex flex-col gap-3 relative">
            <MdClose
              size={25}
              className="absolute top-3 right-3"
              onClick={() => setOpen(false)}
            />
            <h2 className="text-center text-xl font-medium my-3">
              Add New Address
            </h2>
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-lg text-gray-600">
                Country
              </label>
              <select
                id="country"
                value={formAddress?.country}
                className="px-3 py-2 focus:outline-none border border-gray-300 rounded-md"
              >
                <option value="choose country">Choose your country</option>
                {Country.getAllCountries().map((item) => (
                  <option
                    className="block pb-2"
                    key={item.isoCode}
                    value={item.isoCode}
                  >
                    <span> {item?.flag}</span>
                    <span> {item?.name}</span>
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-lg text-gray-600">
                State
              </label>
              <select
                id="country"
                value={formAddress?.country}
                className="px-3 py-2 focus:outline-none border border-gray-300 rounded-md"
              >
                <option value="choose country">Choose your State</option>
                {State?.getStatesOfCountry(formAddress?.country).map((item) => (
                  <option
                    className="block pb-2"
                    key={item.isoCode}
                    value={item.isoCode}
                  >
                    <span> {item?.name}</span>
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-lg text-gray-600">
                Address1
              </label>
              <input
                type="text"
                id="address1"
                value={formAddress?.address1}
                className="px-3 py-2 focus:outline-none border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-lg text-gray-600">
                Address2
              </label>
              <input
                type="text"
                id="address2"
                value={formAddress?.address2}
                className="px-3 py-2 focus:outline-none border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-lg text-gray-600">
                zipCode
              </label>
              <input
                type="text"
                id="zipCode"
                value={formAddress?.zipCode}
                className="px-3 py-2 focus:outline-none border border-gray-300 rounded-md"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="country" className="text-lg text-gray-600">
                Country
              </label>
              <select
                id="country"
                value={formAddress?.country}
                className="px-3 py-2 focus:outline-none border border-gray-300 rounded-md"
              >
                <option value="choose country">Choose Address Type</option>
                {addressType?.map((item) => (
                  <option
                    className="block pb-2"
                    key={item?.name}
                    value={item?.name}
                  >
                    <span> {item?.name}</span>
                  </option>
                ))}
              </select>
            </div>
            <button className="w-full py-2 bg-white border border-gray-300 rounded-md mt-2">
              Add Address
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default ProfileContent;
