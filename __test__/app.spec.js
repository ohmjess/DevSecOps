// __tests__/app.test.js
const request = require("supertest");
const app = require("../app"); // ปรับตามเส้นทางที่ถูกต้อง

describe("GET /", () => {
  it("responds with status 200 and returns the expected message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Ohmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  });
});

describe("GET /about", () => {
  it("responds with status 200 and renders the about page", async () => {
    const response = await request(app).get("/about");
    expect(response.status).toBe(200);
    expect(response.text).toContain("about gay"); // เปลี่ยนข้อความให้ตรงกับเนื้อหาใน about.html
  });
});
