const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing getProfileData API:", () => {
  let consoleLogSpy, consoleErrSpy;

  beforeAll(async () => {
    await pool.query("DELETE FROM email_verification");
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM email_verification WHERE email IN (SELECT email FROM users)");
    await pool.query("DELETE FROM users");
    await pool.end();
  });

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 if username is missing", async () => {
    const res = await request(app)
      .post("/api/get_profile_info")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username field");
  });

  it("should return 404 if username does not exist", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue(null);

    const res = await request(app)
      .post("/api/get_profile_info")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("User not found");
  });

  it("should return 200 if everything is good", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ val1: "val1", val2: "val2" });

    const res = await request(app)
      .post("/api/get_profile_info")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Got user info");
    expect(res.body.user_info).toEqual({ val1: "val1", val2: "val2" });
  });
});