// tests/userRoutes.test.js
const request = require('supertest');
const app = require('../index');
const db = require('../config/db');

beforeAll(async () => {
    // Optionally: initialize test DB, run migrations
});

afterAll(async () => {
    await db.end(); // close pool
});

describe('GET /users', () => {
    test('responds with JSON array', async () => {
        const res = await request(app)
            .get('/users')
            .set('Accept', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
