import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlineEye,
} from 'react-icons/ai';
import { urlServer } from '../../../../server';
import { Link } from 'react-router-dom';
const AllOrders = () => {
  const [orders, setOrders] = useState();
  useEffect(() => {
    const loadOrders = async () => {
      const { data } = await axios.get(
        `${urlServer}/order/get-all-orders-by-shop`,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setOrders(data.message);
    };
    loadOrders();
  }, []);
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
        itemsQty: item.cart.length,
        total: 'US$ ' + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="dashboard w-full p-16 px-3">
      <div className="bg-white p-4">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </div>
  );
};

export default AllOrders;
