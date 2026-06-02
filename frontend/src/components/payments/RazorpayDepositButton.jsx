import { useState } from 'react';
import { loadRazorpayScript } from '../../utils/loadRazorpay';
import {
  createRazorpayOrder,
  verifyRazorpayPayment
} from '../../services/paymentService';

const RazorpayDepositButton = ({ amount = 1, token, user }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      if (!token) {
        alert('Please login first');
        setLoading(false);
        return;
      }

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load');
        setLoading(false);
        return;
      }

      const orderResponse = await createRazorpayOrder({
        amount,
        token
      });

      const orderData = orderResponse.data;

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Venroh',
        description: 'Wallet Deposit',
        order_id: orderData.orderId,

        handler: async function (response) {
          try {
            const verifyPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            };

            const verifyResponse = await verifyRazorpayPayment({
              paymentData: verifyPayload,
              token
            });

            if (verifyResponse.success) {
              alert('Payment successful. Wallet credited.');
            } else {
              alert(verifyResponse.message || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            alert(
              error.response?.data?.message ||
                'Payment completed but verification failed'
            );
          }
        },

        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || ''
        },

        theme: {
          color: '#0f172a'
        },

        modal: {
          ondismiss: function () {
            console.log('Payment popup closed');
          }
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert(response.error.description || 'Payment failed');
      });

      razorpay.open();
    } catch (error) {
      console.error('Create order error:', error);
      alert(error.response?.data?.message || 'Unable to start payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? 'Processing...' : `Pay ₹${amount}`}
    </button>
  );
};

export default RazorpayDepositButton;