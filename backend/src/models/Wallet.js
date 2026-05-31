import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },

    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    escrowBalance: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },

    currency: {
      type: String,
      default: 'INR'
    },

    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { versionKey: false }
);

walletSchema.pre('save', function () {
  this.updatedAt = new Date();
});

export default mongoose.model('Wallet', walletSchema);