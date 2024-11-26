const endpointsJson = require("../endpoints.json");
const request = require("supertest")
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/index")
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */


beforeEach(() => {
  return seed(data)
});

afterAll(() => {
  return db.end()
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe('GET /api/topics', () => {
  test('200: Responds with an array of topic objects', () => {
    return request(app)
      .get('/api/topics')
      .expect(200)
      .then(({ body }) => {
        //Check that body contains a 'topics' key
        expect(body).toHaveProperty('topics')
        expect(Array.isArray(body.topics)).toBe(true)
        //Check that each topic has 'slug' and 'description' properties
        body.topics.forEach((topic)=>{
          expect(topic).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String)
            })
          )
        })
      })
  })
})

describe('GET /api/articles/:article_id', () => {
  test('200: Responds with an article object with the correct properties', () => {
    return request(app)
      .get('/api/articles/1') // Replace 1 with a valid article_id from test data
      .expect(200)
      .then(({ body }) => {
        const { article } = body;
        expect(article).toEqual(
          expect.objectContaining({
            author: expect.any(String),
            title: expect.any(String),
            article_id: 1, // Ensure it matches the requested article_id
            body: expect.any(String),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String)
          })
        );
      });
  });

  test('404: Responds with "Article not found" when article_id does not exist', () => {
    return request(app)
      .get('/api/articles/9999') // Non-existent article_id
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe('Article not found')
      });
  });

  test('400: Responds with "Invalid article ID" for invalid article_id format', () => {
    return request(app)
      .get('/api/articles/not-a-number')
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe('Invalid article ID')
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an array of article objects with the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body
        expect(Array.isArray(articles)).toBe(true)
        expect(articles.length).toBeGreaterThan(0)

        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String) // comment_count is a string because it's a count result from SQL
            })
          );

          // Ensure the 'body' property is not included
          expect(article.body).toBeUndefined()
        });

        // Check if articles are sorted by date in descending order
        expect(new Date(articles[0].created_at).getTime()).toBeGreaterThanOrEqual(
          new Date(articles[articles.length - 1].created_at).getTime()
        );
      });
  });
});