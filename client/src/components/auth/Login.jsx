import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {
  signInUserStart,
  signInUserSuccess,
} from '../../redux/reducers/userReducer';
import axios from 'axios';
import { urlServer } from '../../server';
const Login = () => {
  const [visible, setVisisble] = useState(false);
  const [userForm, setUserForm] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChnage = (e) => {
    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInUserStart());
      const { data } = await axios.post(
        `${urlServer}/auth/user/login`,
        userForm,
        {
          withCredentials: true,
        }
      );
      //console.log(data);
      dispatch(signInUserSuccess(data.message));
      setUserForm({});
      navigate('/');
    } catch (error) {
      //console.log(error);
      dispatch(error?.response?.data.message);
    }
  };
  return (
    <div className="max-w-xl w-full bg-white mx-auto mt-28 shadow-md rounded-md border-gray-400 py-8 px-3">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Login to your account
      </h2>
      <form onSubmit={handleSubmit} className=" w-full  flex flex-col gap-4">
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <input
              type="checkbox"
              id="check"
              className="w-4 h-4 rounded-md focus:outline-none  bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <label htmlFor="check" className="text-sm">
              Remember me
            </label>
          </div>
          <Link to="#" className="text-blue-500 hover:underline text-sm ">
            Forget your Password?
          </Link>
        </div>
        <button className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
          Login
        </button>
      </form>
      <p className="text-gray-600  mt-2 text-sm">
        If you don't have an account please,
        <Link to="/sign-up" className="text-blue-500 pl-2 hover:underline ">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
