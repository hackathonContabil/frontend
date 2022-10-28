import axios from 'axios';

export const axiosDefault = () => {
  const token = localStorage.getItem('TOKEN_KEY');
  const configs = {
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      withCredentials: true,
    },
  };

  return axios.create(configs);
};
