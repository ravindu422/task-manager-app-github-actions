import request from 'supertest';
import app from '../app.js';

describe('Task API', () => {
    describe('GET /health', () => {
        it('should return health status', async () => {
            const res = await request(app).get('/health');

            expect(res.status).toBe(200);
            expect(res.body.status).toBe('OK');
            expect(res.body.timestamp).toBeDefined();
        });
    });
});