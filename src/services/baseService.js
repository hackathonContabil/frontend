import { axiosDefault } from '../common/utils/clientApi';
import { handleErrors } from '../common/utils/handleErrors';
import { handleSuccess } from '../common/utils/handleSuccess';

const axios = axiosDefault();

export const get = async (path) => {
  try {
    const { data } = await axios.get(path);
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const post = async (path, payload) => {
  try {
    const { data } = await axios.post(path, payload);
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const update = async (path, payload) => {
  try {
    const { data } = await axios.put(path, payload);
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const remove = async (path) => {
  try {
    const { data } = await axios.delete(path);
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};
