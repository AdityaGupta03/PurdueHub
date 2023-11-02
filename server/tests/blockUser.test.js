const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing blockUser API:", () => {
  let consoleLogSpy, consoleErrSpy;

  beforeAll(async () => {
    await pool.query("DELETE FROM email_verification WHERE email IN (SELECT email FROM users)");
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

  it("should return 400 if user_id is missing", async () => {
    const res = await request(app)
      .post("/api/block_user")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing user_id");
  });

  it("should return 400 if block_username is missing", async () => {
    const res = await request(app)
      .post("/api/block_user")
      .send({ user_id: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing blocked username");
  });

  it("should return 404 if block account does not exist", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue(null);

    const res = await request(app)
      .post("/api/block_user")
      .send({ user_id: 1, block_username: "testuser" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("User not found");
  });

  it("should return 500 if blockUserQuery fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });
    jest.spyOn(accountQueries, "blockUserQuery").mockReturnValue(false);

    const res = await request(app)
      .post("/api/block_user")
      .send({ user_id: 1, block_username: "testuser" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });

  it("should return 200 if everything is good", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });
    jest.spyOn(accountQueries, "blockUserQuery").mockReturnValue(true);

    const res = await request(app)
      .post("/api/block_user")
      .send({ user_id: 1, block_username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully blocked user");
  });
});
