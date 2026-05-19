import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
  {
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true,
      index: true
    },
    amountPaid: {
      type: Number,
      required: true,
      min: [1, 'Amount paid must be at least 1']
    },
    equityAcquired: {
      type: Number,
      required: true,
      min: [0, 'Equity cannot be negative'],
      max: [100, 'Equity cannot exceed 100%']
    },
    razorpayOrderId: {
      type: String,
      required: true,
      unique: true
    },
    razorpayPaymentId: {
      type: String,
      default: null
    },
    razorpaySignature: {
      type: String,
      default: null
    },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
      default: 'PENDING',
      index: true
    }
  },
  { 
    timestamps: true 
  }
);

investmentSchema.index({ startupId: 1, paymentStatus: 1 });

export default mongoose.model('Investment', investmentSchema);