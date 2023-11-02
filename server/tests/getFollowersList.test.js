const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing getFollowedBy API:", () => {
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
      .post("/api/get_followed_by")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username");
  });

  it("should return 404 if username does not exist", async () => {
    const res = await request(app)
      .post("/api/get_followed_by")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("No account found with username provided.");
  });

  it("should return 500 if getUserInfoFromUsernameQuery fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue(null);

    const res = await request(app)
      .post("/api/get_followed_by")
      .send({ username: "testuser" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });

  it("should return 500 if getFollowedByUsersQuery fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });

    jest.spyOn(accountQueries, "getFollowedByUsersQuery").mockImplementation(() => {
      throw new Error();
    });

    const res = await request(app)
      .post("/api/get_followed_by")
      .send({ username: "testuser" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Error getting people who follow user");
  });

  it("should return 200 with empty array if nobody follwing user", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });
    jest.spyOn(accountQueries, "getFollowedByUsersQuery").mockReturnValue({ rows: [{ followers: null }] });

    const res = await request(app)
      .post("/api/get_followed_by")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.followed_by).toEqual([]);
  });

  it("should return 200 with array if everything good", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });
    jest.spyOn(accountQueries, "getFollowedByUsersQuery").mockReturnValue({ rows: [{ followers: ["testing1", "testing2"] }] });

    const res = await request(app)
      .post("/api/get_followed_by")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.followed_by).toEqual(["testing1", "testing2"]);
  });
});