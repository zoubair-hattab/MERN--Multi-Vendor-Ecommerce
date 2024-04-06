import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import CreateCounpunt from './CreateCounpunt';
import { useSelector } from 'react-redux';
import { urlServer } from '../../../../server';
import axios from 'axios';
const DiscountCodes = () => {
  const [close, setClose] = useState(false);

  const { currentSeller } = useSelector((state) => state.seller);
  const [coupon, setCoupon] = useState([]);
  useEffect(() => {
    const loadCoupoun = async () => {
      try {
        const { data } = await axios.get(
          `${urlServer}/coupon/get-all-coupoun-by-shop/${currentSeller._id}`,
          {
            withCredentials: true,
          }
        );
        setCoupon(data.message);
      } catch (error) {
        //console.log(error.message);
      }
    };
    loadCoupoun();
  }, [currentSeller?._id]);

  const handleDelete = async (id) => {
    await axios.delete(`${urlServer}/coupon/delete/${id}`, {
      withCredentials: true,
    });
    const couponFilter = coupon?.filter((item) => item._id !== id);
    setCoupon(couponFilter);
  };

  const columns = [
    { field: 'id', headerName: 'Id', minWidth: 150, flex: 0.7 },
    {
      field: 'name',
      headerName: 'Coupon Code',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'price',
      headerName: 'Value',
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: 'Delete',
      flex: 0.8,
      minWidth: 120,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupon &&
    coupon.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + ' %',
        sold: 10,
      });
    });
  return (
    <div className="dashboard w-full p-16 px-3  ">
      <div className="bg-white p-4">
        <div className="flex justify-end" onClick={() => setClose(true)}>
          <button className="bg-black  text-white py-3 px-5 font-meduim rounded-md mb-3 ">
            Create Counpount
          </button>
        </div>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      {close && (
        <CreateCounpunt
          setClose={setClose}
          coupon={coupon}
          setCoupon={setCoupon}
        />
      )}
    </div>
  );
};

export default DiscountCodes;
