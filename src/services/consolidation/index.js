import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { get } from '../baseService';

export const getAll = async (userId, data) => {
  try {
    const response = await get(
      `api/v1/bank-account/transactions?userId=${userId}&page=${data.page}&limit=${data.limit}
      ${data.from ? `&from=${data.from}` : ''}
      ${data.to ? `&to=${data.to}` : ''}`,
    );

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const exportCashFlow = async (userId) => {
  try {
    const response = await get(`api/v1/bank-account/export/cash-flow/${userId}`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const exportBankingReconciliation = async (userId) => {
  try {
    const response = await get(`api/v1/bank-account/export/banking-reconciliation/${userId}`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
