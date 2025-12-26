import axios from 'axios';
const API_URL = 'http://localhost:3001/expenses';

// Fetch all expenses
export const getExpenses = async (filters) => {
  const { year, month, category } = filters;
  let query = '';
  if (year)  query += `year=${year}`;
  if (month) query += `month=${month}`;
  if (category && category !== 'All') query += (query ? '&' : '') + `category=${category}`;
  
  const res = await axios.get(`${API_URL}?${query}`);
  return res.data;
};

// Add a new expense
export const addExpense = async (expense) => {
  const res = await axios.post(API_URL, expense);
  return res.data;
};

// Delete an expense
export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

// Update expense status
export const updateExpense = async (id, updatedData) => {
  const res = await axios.patch(`${API_URL}/${id}`, updatedData);
  return res.data;
};

