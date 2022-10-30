import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { get, post, remove } from '../baseService';

export const create = async (payload) => {
  try {
    const response = await post(`api/v1/accounting-office`, payload);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const getAll = async (data) => {
  try {
    const response = await get(
      `api/v1/accounting-office?${data.search ? `filter=${data.search}&` : ''}page=${
        data.page
      }&limit=${data.limit}`,
    );

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const removeOffice = async (data) => {
  try {
    const response = await remove(`api/v1/accounting-office/${data}`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
