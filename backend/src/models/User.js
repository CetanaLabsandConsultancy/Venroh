import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['PLATFORM_ADMIN', 'FOUNDER', 'INVESTOR'],
      required: true,
      index: true
    },
    investorProfile: {
      totalInvested: {
        type: Number,
        default: 0
      },
      accreditationStatus: {
        type: Boolean,
        default: false
      }
    },
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      index: true
    },
    googleCalendarToken: {
      type: String,
      select: false
    }
  },
  { 
    timestamps: true 
  }
);

export default mongoose.model('User', userSchema);