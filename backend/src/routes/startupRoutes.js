import express from 'express';

import {
  createStartup,
  getMyStartup,
  getStartups,
  getStartupById,
  updateMyStartup,
  verifyStartup,
  unverifyStartup
} from '../controllers/startupController.js';

import {
  protect,
  authorizeRoles
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/',
  protect,
  authorizeRoles('FOUNDER'),
  createStartup
);

router.get(
  '/',
  protect,
  authorizeRoles('PLATFORM_ADMIN', 'FOUNDER', 'INVESTOR'),
  getStartups
);

router.get(
  '/my',
  protect,
  authorizeRoles('FOUNDER'),
  getMyStartup
);

router.put(
  '/my',
  protect,
  authorizeRoles('FOUNDER'),
  updateMyStartup
);

router.patch(
  '/:id/verify',
  protect,
  authorizeRoles('PLATFORM_ADMIN'),
  verifyStartup
);

router.patch(
  '/:id/unverify',
  protect,
  authorizeRoles('PLATFORM_ADMIN'),
  unverifyStartup
);

router.get(
  '/:id',
  protect,
  authorizeRoles('PLATFORM_ADMIN', 'FOUNDER', 'INVESTOR'),
  getStartupById
);

export default router;