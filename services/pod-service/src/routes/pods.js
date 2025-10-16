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

/**
 * @swagger
 * /api/v1/pods:
 *   get:
 *     summary: Get all pods
 *     tags: [Pods]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of pods
 *   post:
 *     summary: Create a new pod
 *     tags: [Pods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pod'
 *     responses:
 *       201:
 *         description: Pod created successfully
 */
router.route('/').get(protect, getPods).post(protect, authorize('admin', 'operator'), validate(podSchema), createPod);

/**
 * @swagger
 * /api/v1/pods/{id}:
 *   get:
 *     summary: Get a single pod
 *     tags: [Pods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single pod
 *   put:
 *     summary: Update a pod
 *     tags: [Pods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pod'
 *     responses:
 *       200:
 *         description: Pod updated successfully
 *   delete:
 *     summary: Delete a pod
 *     tags: [Pods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pod deleted successfully
 */
router.route('/:id').get(protect, getPod).put(protect, authorize('admin', 'operator'), validate(podSchema), updatePod).delete(protect, authorize('admin'), deletePod);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Pod:
 *       type: object
 *       required:
 *         - name
 *         - podId
 *         - type
 *         - category
 *       properties:
 *         name:
 *           type: string
 *         podId:
 *           type: string
 *         type:
 *           type: string
 *           enum: [autonomous, semi-autonomous, manual]
 *         category:
 *           type: string
 *           enum: [passenger, cargo, service]
 *         status:
 *           type: string
 *           enum: [active, charging, offline, maintenance, emergency]
 */