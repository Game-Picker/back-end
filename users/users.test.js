const request = require("supertest");
const server = require("../api/server");
const db = require("../data/test-db-config");

// *** [ Sanity Test ] *** //
test("Sanity", () => {
  expect(true).toBe(true);
});

// *** [ Database Utilities ] *** //
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate;
});

afterAll(async (done) => {
  await db.destroy();
  done();
});
