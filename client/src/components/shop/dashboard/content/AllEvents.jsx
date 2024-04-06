import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { urlServer } from '../../../../server';
import { Link } from 'react-router-dom';
const AllEvents = () => {
  const { currentSeller } = useSelector((state) => state.seller);
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const loadEvent = async () => {
      const { data } = await axios.get(
        `${urlServer}/event/get-all-event-by-shop/${currentSeller?._id}`
      );
      setEvents(data?.message);
    };
    loadEvent();
  }, [currentSeller._id]);
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`${urlServer}/event/delete/${id}`, {
      withCredentials: true,
    });
    const filteredEvent = events?.filter((item) => item._id !== id);
    setEvents(filteredEvent);
  };

  const columns = [
    { field: 'id', headerName: 'Event Id', minWidth: 150, flex: 0.7 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: 'Stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: 'sold',
      headerName: 'Sold out',
      type: 'number',
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: 'Preview',
      flex: 0.8,
      minWidth: 100,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        const d = params.row.name;
        const event_name = d.replace(/\s+/g, '-');
        return (
          <>
            <Link to={`/event/${event_name}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
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

  events &&
    events.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: 'US$ ' + item.discountPrice,
        Stock: item.stock,
        sold: 10,
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

export default AllEvents;
