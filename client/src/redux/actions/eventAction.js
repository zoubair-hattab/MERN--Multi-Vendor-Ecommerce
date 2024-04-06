import axios from 'axios';
import {
  loadEventFail,
  loadEventStart,
  loadEventSuccess,
} from '../reducers/eventReducer';
import { urlServer } from '../../server';

export const laodEvent = () => async (dispatch) => {
  try {
    dispatch(loadEventStart());
    const res = await axios.get(`${urlServer}/event/get-all-event`);
    dispatch(loadEventSuccess(res?.data?.message));
  } catch (error) {
    dispatch(loadEventFail(error?.response?.data.message));
  }
};
