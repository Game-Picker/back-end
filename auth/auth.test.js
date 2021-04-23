const request = require("supertest");
const server = require("../api/server");
const db = require("../data/test-db-config");

const testDummy = {
  first_name: "Test",
  last_name: "Dummy",
  email: "test@dummy.com",
  password: "password",
  admin: false,
};

const testDummyCredentials = {
  email: "test@dummy.com",
  password: "password",
};

// *** [ Database Utilities ] *** //
beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async (done) => {
  await db.destroy();
  done();
});

// *** [ Sanity Test ] *** //
test("Sanity", () => {
  expect(true).toBe(true);
});

// *** [ POST /auth/login ] *** //
describe("[POST] /auth/login", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await request(server).post("/auth/register").send(testDummy);
  });
  it("Responds with a proper status code on successful login", async () => {
    const res = await request(server)
      .post("/auth/login")
      .send(testDummyCredentials);
    expect(res.status).toBe(200);
  });
  it("Responds with a welcome message and a token on successful login", async () => {
    const res = await request(server)
      .post("/auth/login")
      .send(testDummyCredentials);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("token");
  });
});
