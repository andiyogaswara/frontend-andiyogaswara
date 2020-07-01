const axios = require('axios');

const comAxios = axios.create({
  baseURL: 'https://simple-contact-crud.herokuapp.com',
});

comAxios.interceptors.response.use(function(response) {
  const {data} = response;

  if (response.data.data === null) {
    const error = new Error(response.data.message || 'Unknown Error');
    error.data = data.data;
    throw error;
  }
  return response.data;
});

export {comAxios};
