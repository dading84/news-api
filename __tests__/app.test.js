const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET - /api/topics", () => {
  test("status: 200 - should return an array of 3 topic objects with slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toHaveLength(3);
        res.body.topics.forEach((topic) => {
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});
