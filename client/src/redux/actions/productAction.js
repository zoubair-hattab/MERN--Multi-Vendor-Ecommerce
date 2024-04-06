import axios from 'axios';
import {
  loadProductFail,
  loadProductStart,
  loadProductSuccess,
} from '../reducers/productReducer';
import { urlServer } from '../../server';

export const laodProduct = () => async (dispatch) => {
  try {
    dispatch(loadProductStart());
    const res = await axios.get(`${urlServer}/product/get-all-product`);
    dispatch(loadProductSuccess(res?.data?.message));
  } catch (error) {
    dispatch(loadProductFail(error?.response?.data.message));
  }
};
