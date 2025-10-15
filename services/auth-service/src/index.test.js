const request = require('supertest');
const express = require('express');
const errorHandler = require('../../../shared/middleware/errorHandler');

const app = express();
app.get('/health', (req, res) => {
  res.status(200).send({ status: 'UP' });
});
app.use(errorHandler);


describe('Auth Service', () => {
    it('should return 200 from health check', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toBe('UP');
    });
});