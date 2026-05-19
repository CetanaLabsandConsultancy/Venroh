import mongoose from 'mongoose';
import Startup from '../models/Startup.js';
import User from '../models/User.js';

// @desc    Founder creates startup
// @route   POST /api/startups
// @access  FOUNDER
export const createStartup = async (req, res) => {
  try {
    const {
      companyName,
      cin,
      pitchDescription,
      pitchDeckUrl,
      logoUrl,
      targetFunding,
      equityOffered,
      baseValuation,
      currentValuation
    } = req.body;

    if (
      !companyName ||
      !cin ||
      !pitchDescription ||
      targetFunding === undefined ||
      equityOffered === undefined ||
      baseValuation === undefined ||
      currentValuation === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: 'Required startup fields are missing'
      });
    }

    const existingStartupByFounder = await Startup.findOne({
      founderId: req.user._id
    });

    if (existingStartupByFounder) {
      return res.status(400).json({
        success: false,
        message: 'Founder already has a startup'
      });
    }

    const existingStartupByCin = await Startup.findOne({
      cin: cin.trim()
    });

    if (existingStartupByCin) {
      return res.status(409).json({
        success: false,
        message: 'Startup with this CIN already exists'
      });
    }

    const startup = await Startup.create({
      founderId: req.user._id,
      companyName,
      cin: cin.trim(),
      pitchDescription,
      pitchDeckUrl: pitchDeckUrl || null,
      logoUrl: logoUrl || null,
      targetFunding,
      raisedFunding: 0,
      equityOffered,
      baseValuation,
      currentValuation,
      isVerified: false,
      valuationSource: 'PENDING'
    });

    await User.findByIdAndUpdate(req.user._id, {
      startupId: startup._id
    });

    return res.status(201).json({
      success: true,
      message: 'Startup created successfully. Waiting for admin verification.',
      startup
    });
  } catch (error) {
    console.error('Create Startup Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while creating startup'
    });
  }
};

// @desc    Get logged-in founder startup
// @route   GET /api/startups/my
// @access  FOUNDER
export const getMyStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({
      founderId: req.user._id
    });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'No startup found for this founder'
      });
    }

    return res.status(200).json({
      success: true,
      startup
    });
  } catch (error) {
    console.error('Get My Startup Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching startup'
    });
  }
};

// @desc    Get startups
// @route   GET /api/startups
// @access  INVESTOR / ADMIN / FOUNDER
export const getStartups = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'INVESTOR') {
      filter.isVerified = true;
    }

    if (req.user.role === 'FOUNDER') {
      filter.founderId = req.user._id;
    }

    const startups = await Startup.find(filter)
      .populate('founderId', 'name email role')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: startups.length,
      startups
    });
  } catch (error) {
    console.error('Get Startups Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching startups'
    });
  }
};

// @desc    Get single startup by ID
// @route   GET /api/startups/:id
// @access  Protected
export const getStartupById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid startup ID'
      });
    }

    const startup = await Startup.findById(id).populate(
      'founderId',
      'name email role'
    );

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }

    if (req.user.role === 'INVESTOR' && !startup.isVerified) {
      return res.status(403).json({
        success: false,
        message: 'You cannot view unverified startups'
      });
    }

    if (
      req.user.role === 'FOUNDER' &&
      startup.founderId._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'You can only view your own startup'
      });
    }

    return res.status(200).json({
      success: true,
      startup
    });
  } catch (error) {
    console.error('Get Startup By ID Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching startup'
    });
  }
};

// @desc    Founder updates own startup
// @route   PUT /api/startups/my
// @access  FOUNDER
export const updateMyStartup = async (req, res) => {
  try {
    const startup = await Startup.findOne({
      founderId: req.user._id
    });

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'No startup found for this founder'
      });
    }

    const allowedUpdates = [
      'companyName',
      'pitchDescription',
      'pitchDeckUrl',
      'logoUrl',
      'targetFunding',
      'equityOffered',
      'baseValuation',
      'currentValuation'
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        startup[field] = req.body[field];
      }
    });

    startup.isVerified = false;
    startup.valuationSource = 'PENDING';

    const updatedStartup = await startup.save();

    return res.status(200).json({
      success: true,
      message: 'Startup updated successfully. Admin verification required again.',
      startup: updatedStartup
    });
  } catch (error) {
    console.error('Update Startup Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while updating startup'
    });
  }
};

// @desc    Admin verifies startup
// @route   PATCH /api/startups/:id/verify
// @access  PLATFORM_ADMIN
export const verifyStartup = async (req, res) => {
  try {
    const { id } = req.params;
    const { valuationSource } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid startup ID'
      });
    }

    const startup = await Startup.findById(id);

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }

    startup.isVerified = true;

    if (valuationSource) {
      startup.valuationSource = valuationSource;
    } else {
      startup.valuationSource = 'VALUER_CERTIFICATE';
    }

    const updatedStartup = await startup.save();

    return res.status(200).json({
      success: true,
      message: 'Startup verified successfully',
      startup: updatedStartup
    });
  } catch (error) {
    console.error('Verify Startup Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while verifying startup'
    });
  }
};

// @desc    Admin un-verifies startup
// @route   PATCH /api/startups/:id/unverify
// @access  PLATFORM_ADMIN
export const unverifyStartup = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid startup ID'
      });
    }

    const startup = await Startup.findById(id);

    if (!startup) {
      return res.status(404).json({
        success: false,
        message: 'Startup not found'
      });
    }

    startup.isVerified = false;
    startup.valuationSource = 'PENDING';

    const updatedStartup = await startup.save();

    return res.status(200).json({
      success: true,
      message: 'Startup verification removed',
      startup: updatedStartup
    });
  } catch (error) {
    console.error('Unverify Startup Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while unverifying startup'
    });
  }
};