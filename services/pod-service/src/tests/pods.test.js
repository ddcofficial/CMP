const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const podRoutes = require('../routes/pods');
const errorHandler = require('../../../../shared/middleware/errorHandler');
const Pod = require('../models/Pod');
const jwt = require('jsonwebtoken');

let mongoServer;
let app;
let adminToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  app = express();
  app.use(express.json());
  app.use('/api/v1/pods', podRoutes);
  app.use(errorHandler);

  // Mock user and generate token for testing protected routes
  const mockUser = { id: new mongoose.Types.ObjectId(), role: 'admin' };
  adminToken = jwt.sign(mockUser, 'test-secret');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
    await Pod.deleteMany({});
});


describe('Pod Service', () => {
    describe('GET /api/v1/pods', () => {
        it('should get all pods', async () => {
            await Pod.create({ name: 'Test Pod', podId: 'test-pod', type: 'autonomous', category: 'passenger' });
            const res = await request(app)
                .get('/api/v1/pods')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.success).toBe(true);
            expect(res.body.count).toBe(1);
        });
    });

    describe('POST /api/v1/pods', () => {
        it('should create a new pod', async () => {
            const res = await request(app)
                .post('/api/v1/pods')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Test Pod',
                    podId: 'test-pod',
                    type: 'autonomous',
                    category: 'passenger'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('Test Pod');
        });
    });
});