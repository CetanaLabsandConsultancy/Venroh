import RazorpayDepositButton from './components/payments/RazorpayDepositButton';

function App() {
  const token = localStorage.getItem('token');

  const user = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '9999999999'
  };

  return (
    <div style={{ padding: '40px' }}>
      <h1>Razorpay Test Payment</h1>

      <p>Amount: ₹1</p>

      <RazorpayDepositButton
        amount={1}
        token={token}
        user={user}
      />
    </div>
  );
}

export default App;