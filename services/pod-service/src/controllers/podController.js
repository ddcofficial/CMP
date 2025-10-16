const Pod = require('../models/Pod');
const logger = require('../../../../shared/utils/logger');

// @desc    Get all pods
// @route   GET /api/v1/pods
// @access  Public
exports.getPods = async (req, res, next) => {
  try {
    // Return mock data for the prototype
    const mockPods = [
      { _id: '1', podId: 'Pod 1', name: 'Alpha Pod', status: 'Available', battery: { currentLevel: 88 }, location: { coordinates: [-73.987, 40.748] } },
      { _id: '2', podId: 'Pod 2', name: 'Bravo Pod', status: 'In Use', battery: { currentLevel: 54 }, location: { coordinates: [-73.986, 40.751] } },
      { _id: '3', podId: 'Pod 3', name: 'Charlie Pod', status: 'Available', battery: { currentLevel: 95 }, location: { coordinates: [-73.98, 40.749] } },
    ];

    res.status(200).json({
      success: true,
      count: mockPods.length,
      data: mockPods,
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
    const pod = { _id: '1', podId: 'Pod 1', name: 'Alpha Pod', status: 'Available', battery: { currentLevel: 88 }, location: { coordinates: [-73.987, 40.748] } };
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
    const pod = req.body;
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
    const pod = req.body;
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
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};