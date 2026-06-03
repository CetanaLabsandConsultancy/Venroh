import api from './api';

export const createRazorpayOrder = async ({ amount }) => {
  const response = await api.post('/v1/payments/create-order', { amount });
  return response.data;
};

export const verifyRazorpayPayment = async ({ paymentData }) => {
  const response = await api.post('/v1/payments/verify', paymentData);
  return response.data;
};

export const getMyPaymentTransactions = async () => {
  const response = await api.get('/v1/payments/my-transactions');
  return response.data;
};