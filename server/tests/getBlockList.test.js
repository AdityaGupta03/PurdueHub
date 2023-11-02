const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing getBlockList API:", () => {
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

  it("should return 404 if username does not exist", async () => {
    const res = await request(app)
      .post("/api/get_block_list")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("No account found with username provided");
  });

  it("should return 500 if getBlockListQuery fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getBlockListQuery").mockReturnValue(false);

    const res = await request(app)
      .post("/api/get_block_list")
      .send({ username: "testuser" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });

  it("should return 200 with empty array if user has no blocked users", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getBlockListQuery").mockReturnValue({ rows : [{ blocked_username: null }] });

    const res = await request(app)
      .post("/api/get_block_list")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.blocked).toEqual([]);
  });

  it("should return 200 with array of blocked users if user has blocked users", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getBlockListQuery").mockReturnValue({ rows : [{ blocked_username: ["testuser2"] }] });

    const res = await request(app)
      .post("/api/get_block_list")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.blocked).toEqual(["testuser2"]);
  });
});