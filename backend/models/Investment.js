import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema(
  {
    investorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    startupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true, index: true },
    amountPaid: { type: Number, required: true, min: 1 },
    equityAcquired: { type: Number, required: true },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    paymentStatus: { 
      type: String, 
      enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'], 
      default: 'PENDING',
      index: true 
    }
  },
  { timestamps: true }
);

investmentSchema.index({ startupId: 1, paymentStatus: 1 });

export const Investment = mongoose.model('Investment', investmentSchema);