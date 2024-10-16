// __tests__/app.test.js
const request = require('supertest');
const app = require('../app'); // ปรับตามเส้นทางที่ถูกต้อง

describe('GET /', () => {
    it('responds with status 200 and returns the expected message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe("<h1>Hello World, this is my first project for becoming a 'DEVSECOPS' engineer</h1>"); // ปรับให้ตรงกับข้อความที่ตอบกลับ
    });
});



describe('GET /about', () => {
    it('responds with status 200 and renders the about page', async () => {
        const response = await request(app).get('/about');
        expect(response.status).toBe(200);
        expect(response.text).toContain('about page'); // เปลี่ยนข้อความให้ตรงกับเนื้อหาใน about.html
    });
});
