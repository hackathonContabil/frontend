import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { post } from '../baseService';

export const create = async (payload) => {
  try {
    const response = await post(`/api/v1/accounting-office`, payload);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
