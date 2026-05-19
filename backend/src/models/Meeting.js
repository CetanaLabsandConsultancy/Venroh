import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Startup',
      required: true
    },
    investorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    founderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    googleEventId: {
      type: String,
      default: null
    },
    scheduledStartTime: {
      type: Date,
      required: true,
      index: true
    },
    scheduledEndTime: {
      type: Date,
      required: true
    },
    roomId: {
      type: String,
      required: true,
      unique: true
    },
    meetingStatus: {
      type: String,
      enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
      default: 'SCHEDULED'
    }
  },
  { 
    timestamps: true 
  }
);

meetingSchema.index({ startupId: 1, investorId: 1, scheduledStartTime: 1 }, { unique: true });

export default mongoose.model('Meeting', meetingSchema);