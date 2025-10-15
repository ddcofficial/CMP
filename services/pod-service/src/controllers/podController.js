const Pod = require('../models/Pod');
const logger = require('../../../../shared/utils/logger');

// @desc    Get all pods
// @route   GET /api/v1/pods
// @access  Public
exports.getPods = async (req, res, next) => {
  try {
    const pods = await Pod.find();
    res.status(200).json({
      success: true,
      count: pods.length,
      data: pods,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single pod
// @route   GET /api/v1/pods/:id
// @access  Public
exports.getPod = async (req, res, next) => {
  try {
    const pod = await Pod.findById(req.params.id);
    if (!pod) {
      return res.status(404).json({ success: false, message: 'Pod not found' });
    }
    res.status(200).json({ success: true, data: pod });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new pod
// @route   POST /api/v1/pods
// @access  Private
exports.createPod = async (req, res, next) => {
  try {
    const pod = await Pod.create(req.body);
    res.status(201).json({
      success: true,
      data: pod,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update pod
// @route   PUT /api/v1/pods/:id
// @access  Private
exports.updatePod = async (req, res, next) => {
  try {
    const pod = await Pod.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!pod) {
      return res.status(404).json({ success: false, message: 'Pod not found' });
    }
    res.status(200).json({ success: true, data: pod });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete pod
// @route   DELETE /api/v1/pods/:id
// @access  Private
exports.deletePod = async (req, res, next) => {
  try {
    const pod = await Pod.findByIdAndDelete(req.params.id);
    if (!pod) {
      return res.status(404).json({ success: false, message: 'Pod not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};