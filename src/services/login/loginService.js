import { handleErrors } from '../../common/utils/handleErrors';
import { post } from '../baseService';

export const login = async (payload) => {
  try {
    const { data } = await post(`/api/v1/`, payload);
    localStorage.setItem('TOKEN_KEY', data.token);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return handleErrors(error);
  }
};
