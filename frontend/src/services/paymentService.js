import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const createRazorpayOrder = async ({ amount, token }) => {
  const response = await axios.post(
    `${API_BASE_URL}/v1/payments/create-order`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

export const verifyRazorpayPayment = async ({ paymentData, token }) => {
  const response = await axios.post(
    `${API_BASE_URL}/v1/payments/verify`,
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data;
};

export const getMyPaymentTransactions = async ({ token }) => {
  const response = await axios.get(
    `${API_BASE_URL}/v1/payments/my-transactions`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};