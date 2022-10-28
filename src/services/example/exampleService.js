import { get, create, update, remove } from '../baseService';

export const getActivities = async () => {
  return await get('/activities');
};

export const getActivity = async (id) => {
  return await get(`/activities/${id}`);
};

export const createActivity = async (activity) => {
  return await create('/activities', activity);
};

export const updateActivity = async (activity) => {
  return await update('/activities', activity);
};

export const deleteActivity = async (id) => {
  return await remove(`/activities/${id}`);
};
