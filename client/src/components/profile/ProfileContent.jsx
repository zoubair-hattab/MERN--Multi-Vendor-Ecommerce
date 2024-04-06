import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { backend_url } from '../../server';
import { MdOutlineAddAPhoto, MdOutlineTrackChanges } from 'react-icons/md';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from 'react-icons/ai';
const ProfileContent = ({ active }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userForm, setUserForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
  });
  const fileRef = useRef();
  const handleChnageInput = (e) => {
    setUserForm({
      ...userForm,
      [e.target.id]: e.target.value,
    });
  };
  const [file, setFile] = useState(null);
  const handelSubmit = (e) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };
  return (
    <>
      {active == 1 && (
        <form className="w-full flex flex-col gap-6" onSubmit={handelSubmit}>
          <div className="w-32 h-32 relative mx-auto border-2 border-teal-500 rounded-full ">
            <img
              src={`${
                file
                  ? URL.createObjectURL(file)
                  : `${backend_url}${currentUser?.avatar}`
              }
              `}
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
            <div className="flex-auto flex flex-col gap-2">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                defaultValue={currentUser?.name}
                id="name"
                onChange={handleChnageInput}
              />
            </div>
            <div className="flex-auto flex flex-col gap-2">
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
            <div className="flex-auto flex flex-col gap-2">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                id="phone_number"
                onChange={handleChnageInput}
              />
            </div>
            <div className="flex-auto flex flex-col gap-2">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                id="ZipCode"
                onChange={handleChnageInput}
              />
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-4">
            <div className="flex-auto flex flex-col gap-2">
              <label htmlFor="fulname">Address1</label>
              <input
                type="text"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                id="address1"
                onChange={handleChnageInput}
              />
            </div>
            <div className="flex-auto flex flex-col gap-2">
              <label htmlFor="fulname">Addrsss2</label>
              <input
                type="text"
                className="py-2 w-full border border-gay-300 focus:outline-none px-3"
                id="address2"
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
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div className={`py-2 px-5 bg-black text-white !rounded-md`}>
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
    </div>
  );
};
export default ProfileContent;
