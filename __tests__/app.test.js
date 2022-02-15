const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const { convertTimestampToDate } = require("../db/helpers/utils");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("ALL", () => {
  test("status: 404 - should return with a 'Path not found!' message & status code of 404 if the path is not found", () => {
    return request(app)
      .get("/api/topicsss")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found!");
      });
  });
});

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

describe("GET - /api/articles/:article_id", () => {
  test("status: 200 - should return an article with the specified properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(res.body.article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          })
        );
      });
  });
  test("status: 400 - should return a 'Bad request!' message and status 400 if the article_id is not an integer", () => {
    return request(app)
      .get("/api/articles/dog")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request! Invalid property");
      });
  });
  test("status: 404 - should return a 'No article found ...' message and status 404 if the article_id does not exist in the db", () => {
    return request(app)
      .get("/api/articles/9999")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("No article found for article_id: 9999");
      });
  });
});

describe("PATCH - /api/articles/:article_id", () => {
  test("status: 200 - should increment the articles votes field in the db, and return the updated article", () => {
    const expected1 = {
      article: {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2020-07-09T20:11:00.000Z",
        votes: 101,
      },
    };
    const expected2 = { article: { ...expected1.article, votes: 1 } };
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual(expected1);
      })
      .then(() => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: -100 })
          .expect(200)
          .then((res) => {
            expect(res.body).toEqual(expected2);
          });
      });
  });
  test("status: 400 - should return a message and a status of 400 when no inc_votes property on the request body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({})
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request! No inc_votes property");
      });
  });
  test("status: 400 - should return a message and a status of 400 when inc_votes property is invalid", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "cat" })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Bad request! Invalid property");
      });
  });
});
