import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

export const loginUser = async ({ email, password }) => {
  const res = await axios.get(
    `${API_URL}?email=${email}&password=${password}`
  );

  if (res.data.length === 0) {
    throw new Error('Invalid credentials');
  }
  return res.data[0];
};

export const addUser = async (user) => {
  const res = await axios.post(API_URL, user);
  return res.data;
};