const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const { convertTimestampToDate } = require("../db/data/helpers/utils");

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
  test("status: 404 - should return with a message & status code of 404 if the path is not found", () => {
    return request(app)
      .get("/api/topicsss")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found!");
      });
  });
});

describe("GET - /api/articles/:article_id", () => {
  test("status: 200 - should return an article matching the article_id in the endpoint", () => {
    const expectedArticle = convertTimestampToDate({
      article_id = 1,
      title: "Living in the shadow of a great man",
      topic: "mitch",
      author: "butter_bridge",
      body: "I find this existence challenging",
      created_at: 1594329060000,
      votes: 100
    });
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toEqual(expectedArticle);
      });
  });
});
