import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema(
  {
    founderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    companyName: {
      type: String,
      required: true,
      trim: true
    },
    cin: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    pitchDescription: {
      type: String,
      required: true
    },
    pitchDeckUrl: {
      type: String,
      default: null
    },
    logoUrl: {
      type: String,
      default: null
    },
    targetFunding: {
      type: Number,
      required: true,
      min: 0
    },
    raisedFunding: {
      type: Number,
      default: 0
    },
    equityOffered: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    baseValuation: {
      type: Number,
      required: true
    },
    currentValuation: {
      type: Number,
      required: true
    },
    isVerified: {
      type: Boolean,
      default: false,
      index: true
    },
    valuationSource: {
      type: String,
      enum: ['MCA_API', 'VALUER_CERTIFICATE', 'PENDING'],
      default: 'PENDING'
    }
  },
  { 
    timestamps: true 
  }
);

startupSchema.index({ isVerified: -1, currentValuation: -1 });

export default mongoose.model('Startup', startupSchema);