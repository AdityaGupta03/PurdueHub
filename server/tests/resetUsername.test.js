const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const helperFuncs = require("../controllers/helperFunctions");
const accountController = require("../controllers/accountController");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("resetUsername API", () => {
  let consoleLogSpy;

  beforeAll(async () => {
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM email_verification WHERE email IN (SELECT email FROM users)");
    await pool.query("DELETE FROM users");
    await pool.end();

    if (global.jasmine?.currentTest?.results()?.failedCount > 0) {
      console.log('One or more tests failed. Console.log output:', consoleLogSpy.mock.calls);
    }
  });

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("should return 400 if email is not provided", async () => {
    const res = await request(app).post("/api/reset_username").send({});
    expect(res.statusCode).toEqual(400);
  });

  it("should return 400 if new username is not provided", async () => {
    const res = await request(app)
      .post("/api/reset_username")
      .send({ email: "test@example.com" });

    expect(res.statusCode).toEqual(400);
  });

  it("should return 400 if not unique username", async () => {
    jest.spyOn(accountQueries, "isUniqueUsernameQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/reset_username")
      .send({ email: "test2@example.com", newUsername: "testuser" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Not unique username");
  });

  it("should return 200 if email is found and username is reset", async () => {
    const fakeAccQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    const fakeAccVals = [ "testuser", "test@example.com", "password"];
    await pool.query(fakeAccQuery, fakeAccVals);

    jest.spyOn(accountQueries, "isUniqueUsernameQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/reset_username")
      .send({ email: "test@example.com", newUsername: "newusernameisnewyay" });
    expect(res.statusCode).toEqual(200);

    const user = await pool.query("SELECT * FROM users WHERE email = $1", ["test@example.com"]);
    expect(user.rows[0].username).not.toEqual("testuser");
  });
});