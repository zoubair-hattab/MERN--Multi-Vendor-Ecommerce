import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaRegUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { urlServer } from '../../server';
import { toast } from 'react-toastify';
const Register = () => {
  const [visible, setVisisble] = useState(false);
  const [userForm, setUserForm] = useState({});
  const [file, seFile] = useState(null);
  const navigate = useNavigate();
  const fileInput = useRef();
  const handleChnage = (e) => {
    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', userForm?.name);
      formData.append('email', userForm?.email);
      formData.append('password', userForm?.password);

      const res = await axios.post(
        `${urlServer}/auth/user/create-user`,
        formData,
        config
      );
      toast.success(res.data.message);
      setUserForm({});
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };
  return (
    <div className="max-w-xl w-full bg-white mx-auto mt-28 shadow-md rounded-md border-gray-400 py-8 px-3">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Register to your account
      </h2>
      <form onSubmit={handleSubmit} className=" w-full  flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-gray-600">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2.5 border-2 text-base text-gray-700 rounded-md border-gray-400 focus:outline-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChnage}
            value={userForm?.name || ''}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-gray-600">
            Email address
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-2.5 border-2 text-base text-gray-700 rounded-md border-gray-400 focus:outline-none bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleChnage}
            value={userForm?.email || ''}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-medium text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              type={`${visible ? 'text' : 'password'}`}
              id="password"
              className="w-full p-2.5 border-2 text-base text-gray-700 rounded-md  border-gray-400 focus:outline-none
               bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
              onChange={handleChnage}
              value={userForm?.password || ''}
            />
            {!visible ? (
              <FaEyeSlash
                size={20}
                color="gray"
                className="absolute top-[50%]  translate-y-[-50%] right-3"
                onClick={() => setVisisble(true)}
              />
            ) : (
              <FaEye
                size={20}
                color="gray"
                className="absolute top-[50%]  translate-y-[-50%] right-3"
                onClick={() => setVisisble(false)}
              />
            )}
          </div>
        </div>

        <div className="flex  gap-5">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              className="w-[50px] h-[50px] object-cover rounded-full"
            />
          ) : (
            <FaRegUserCircle size={50} className="text-gray-600" />
          )}
          <button
            onClick={() => fileInput.current.click()}
            className="shadow-sm rounded-md border border-gray-300  px-3"
          >
            Upload an image
          </button>
        </div>
        <input
          type="file"
          id="file"
          accept="images/*"
          ref={fileInput}
          className="hidden"
          onChange={(e) => seFile(e.target.files[0])}
        />
        <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
          Register
        </button>
      </form>
      <p className="text-gray-600  mt-2 text-sm">
        If you have an account please,
        <Link to="/sing-in" className="text-blue-500 pl-2 hover:underline ">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
