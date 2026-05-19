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
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    password: { 
      type: String, 
      required: true,
      select: false
    },

    role: { 
      type: String, 
      enum: ['admin', 'investor', 'founder'], 
      required: true 
    },

    isVerified: { 
      type: Boolean, 
      default: false
    },

    isActive: { 
      type: Boolean, 
      default: true
    },

    founderProfile: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Founder' 
    },

    investorProfile: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Investor' 
    }
  },
  { timestamps: true } 
);

userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);