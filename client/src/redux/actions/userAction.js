import axios from 'axios';
import {
  loadUserFail,
  loadUserStart,
  loadUserSuccess,
} from '../reducers/userReducer';
import { urlServer } from '../../server';
import {
  loadShopFail,
  loadShopStart,
  loadShopSuccess,
} from '../reducers/sellerReducer';

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserStart());
    const { data } = await axios.get(`${urlServer}/auth/user/getuser`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(data?.message));
  } catch (error) {
    dispatch(loadUserFail(error?.response?.data.message));
  }
};
// shop
export const loadShop = () => async (dispatch) => {
  try {
    dispatch(loadShopStart());
    const { data } = await axios.get(`${urlServer}/auth/shop/getshop`, {
      withCredentials: true,
    });
    dispatch(loadShopSuccess(data?.message));
  } catch (error) {
    dispatch(loadShopFail(error?.response?.data.message));
  }
};
