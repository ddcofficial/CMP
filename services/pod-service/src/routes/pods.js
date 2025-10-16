const express = require('express');
const {
  getPods,
  getPod,
  createPod,
  updatePod,
  deletePod,
} = require('../controllers/podController');

const router = express.Router();

router.route('/').get(getPods).post(createPod);
router.route('/:id').get(getPod).put(updatePod).delete(deletePod);

module.exports = router;