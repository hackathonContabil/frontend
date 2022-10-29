import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { get } from '../baseService';

export const getAll = async (userId, data) => {
  try {
    const response = await get(
      `/api/v1/bank-account/transactions?userId=${userId}&page=${data.page}&limit=${data.limit}`,
    );

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
