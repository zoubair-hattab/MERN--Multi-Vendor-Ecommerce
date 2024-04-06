import React, { useEffect, useState } from 'react';
import { categoriesData } from '../../../../static/data';
import { FaRegPlusSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import ms from 'ms';
import moment from 'moment';
import { urlServer } from '../../../../server';
import { useNavigate } from 'react-router-dom';
const CreateEvent = () => {
  const { currentSeller } = useSelector((state) => state.seller);
  const [images, setImages] = useState([]);
  const [eventForm, setEventForm] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minDate, setMinDate] = useState();
  const navigate = useNavigate();
  const handleChangeInput = (e) => {
    setEventForm({ ...eventForm, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    const minsec = ms('3d');
    const minsdate = new Date(+new Date(startDate) + minsec);
    setMinDate(moment(minsdate).format('YYYY-MM-DD'));
  }, [startDate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('images', image);
      });
      formData.append('name', eventForm?.name);
      formData.append('description', eventForm?.description);
      formData.append('category', eventForm?.category);
      formData.append('tags', eventForm?.tags);
      formData.append('originalPrice', eventForm?.originalPrice);
      formData.append('discountPrice', eventForm?.discountPrice);
      formData.append('stock', eventForm?.stock);
      formData.append('shopId', currentSeller?._id);
      formData.append('start_Date', startDate);
      formData.append('Finish_Date', endDate);

      const { data } = await axios.post(
        `${urlServer}/event/create-event`,
        formData,
        {
          withCredentials: true,
        }
      );
      navigate('/shop/dashboard?tab=all-events');
      toast.success(data.message);
    } catch (error) {
      //console.log(error);
      // toast.error(error?.response.data.message);
    }
  };
  return (
    <div className="dashboard w-full p-16 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white h-[90%] overflow-y-auto max-w-xl w-full mx-auto flex flex-col py-5 p-3 gap-4"
      >
        <h2 className="text-center text-2xl font-medium">Create Event</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
            onChange={handleChangeInput}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Description : </label>
          <textarea
            placeholder="Enter your description..."
            type="text"
            cols={3}
            rows={4}
            id="description"
            onChange={handleChangeInput}
            className="w-full  resize-none border border-gray-300 focus:outline-none rounded-md text-lg px-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category : </label>

          <select
            onChange={handleChangeInput}
            id="category"
            className="py-2 focus:outline-none border border-gray-300 rounded-md"
          >
            <option defaultChecked>Choose Category</option>
            {categoriesData?.map((item, index) => (
              <option key={index} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Tags : </label>
          <input
            onChange={handleChangeInput}
            type="text"
            placeholder="Tags..."
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Original Price : </label>
          <input
            onChange={handleChangeInput}
            id="originalPrice"
            type="number"
            placeholder="Original Price..."
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Price (With Discount) </label>
          <input
            onChange={handleChangeInput}
            type="number"
            id="discountPrice"
            placeholder="Price (With Discount)..."
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Event Stock </label>
          <input
            onChange={handleChangeInput}
            type="number"
            id="stock"
            placeholder="Event Stock..."
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Event Start </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="name">Event End </label>
          <input
            onChange={(e) => setEndDate(e.target.value)}
            min={minDate}
            type="date"
            className="w-full p-2 border border-gray-300 focus:outline-none rounded-md text-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="file" className="flex flex-col gap-2">
            <p>Upload Image</p>
            <FaRegPlusSquare size={20} />
          </label>
          <input
            type="file"
            id="file"
            multiple
            accept="images/*"
            placeholder="Tags..."
            className="w-full p-2 hidden border border-gray-300 focus:outline-none rounded-md text-lg"
            onChange={(e) => setImages([...e.target.files])}
          />
          <div className="flex items-center gap-4">
            {images?.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                className="w-20 h-20 object-contain border border-gray-400"
              />
            ))}
          </div>
          <button className="w-full py-2 border border-gray-400">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
