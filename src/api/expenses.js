import axios from 'axios';

const API_URL =
  import.meta.env.PROD
    ? 'https://examples-xi-sage.vercel.app/expenses'
    : 'http://localhost:3000/expenses';

// Fetch all expenses
export const getExpenses = async (filters) => {
  const { year, month, category } = filters;
  const params = new URLSearchParams();
  
  if (year) params.append('year', year);
  if (month) params.append('month', month);
  if (category && category !== 'All') params.append('category', category);
  
  const query = params.toString();
  const res = await axios.get(`${API_URL}${query ? '?' + query : ''}`);
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

