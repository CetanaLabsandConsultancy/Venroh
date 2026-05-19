import mongoose from 'mongoose';

const founderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true,
      unique: true
    },

    companyName: { 
      type: String, 
      required: true,
      trim: true
    },

    industry: { 
      type: String, 
      required: true,
      trim: true
    },

    description: { 
      type: String, 
      required: true,
      maxlength: 2000
    },

    stage: {
      type: String,
      enum: ['idea', 'prototype', 'mvp', 'early_revenue', 'growth'],
      default: 'idea'
    },

    fundingGoal: { 
      type: Number, 
      required: true,
      min: 0
    },

    currentFunding: {
      type: Number,
      default: 0,
      min: 0
    },

    pitchTitle: {
      type: String,
      trim: true
    },

    pitchSummary: {
      type: String,
      maxlength: 1000
    },

    pitchDeckUrl: { 
      type: String, 
      default: ''
    },

    website: { 
      type: String, 
      default: '',
      trim: true
    },

    location: {
      type: String,
      default: '',
      trim: true
    },

    foundedYear: {
      type: Number
    },

    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
);

founderSchema.index({ industry: 1 });
founderSchema.index({ stage: 1 });
founderSchema.index({ verificationStatus: 1 });

export default mongoose.model('Founder', founderSchema);