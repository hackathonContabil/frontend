import axios from 'axios';

export const axiosDefault = () => {
  const token = localStorage.getItem('TOKEN_KEY');
  const configs = {
    baseURL: 'http://localhost:3000/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      withCredentials: true,
    },
    withCredentials: true,
  };

  return axios.create(configs);
};
