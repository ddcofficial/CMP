const express = require('express');
const {
  getPods,
  getPod,
  createPod,
  updatePod,
  deletePod,
} = require('../controllers/podController');
const { validate, podSchema } = require('../middleware/validation');
const { protect, authorize } = require('../../../../shared/middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, getPods)
    .post(protect, authorize('admin', 'operator'), validate(podSchema), createPod);

router.route('/:id')
    .get(protect, getPod)
    .put(protect, authorize('admin', 'operator'), validate(podSchema), updatePod)
    .delete(protect, authorize('admin'), deletePod);

module.exports = router;