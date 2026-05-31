import dotenv from "dotenv";
import crypto from "crypto";

// Load .env from the project root
dotenv.config({ path: "./.env" }); // <-- relative to where you run 'node', backend/

console.log("KEY_ID =", process.env.RAZORPAY_KEY_ID);
console.log("SECRET =", process.env.RAZORPAY_KEY_SECRET);

const orderId = "order_SvrTU5sQjsYK9H";
const paymentId = "pay_test123";

const signature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  .update(`${orderId}|${paymentId}`)
  .digest("hex");

console.log({
  razorpay_order_id: orderId,
  razorpay_payment_id: paymentId,
  razorpay_signature: signature
});