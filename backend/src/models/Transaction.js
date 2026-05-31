import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      default: null
    },

    razorpayOrderId: {
      type: String,
      sparse: true,
      unique: true
    },

    razorpayPaymentId: {
      type: String,
      default: ''
    },

    razorpaySignature: {
      type: String,
      default: ''
    },

    receipt: {
      type: String,
      default: ''
    },

    type: {
      type: String,
      enum: ['deposit', 'investment', 'withdrawal', 'escrow_hold'],
      required: true
    },

    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      required: true,
      default: 'pending'
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    currency: {
      type: String,
      default: 'INR'
    },

    notes: {
      type: Object,
      default: {}
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

transactionSchema.index({ walletId: 1, timestamp: -1 });
transactionSchema.index({ userId: 1, timestamp: -1 });
transactionSchema.index({ status: 1 });

export default mongoose.model('Transaction', transactionSchema);