const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing getMutualFriends API:", () => {
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
      .post("/api/get_mutual_friends")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username");
  });

  it("should return 400 if user_id is missing", async () => {
    const res = await request(app)
      .post("/api/get_mutual_friends")
      .send({ other_username: "testuser" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing user_id");
  });

  it("should return 404 if other user does not exist", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue(null);

    const res = await request(app)
      .post("/api/get_mutual_friends")
      .send({ user_id: 1, other_username: "testuser" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("User not found");
  });

  it("should return 500 if getMutualFriendsQuery fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });
    jest.spyOn(accountQueries, "getMutualFriendsQuery").mockReturnValue(null);

    const res = await request(app)
      .post("/api/get_mutual_friends")
      .send({ user_id: 1, other_username: "testuser" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal server error");
  });

  it("should return 200 if everything is good and no mutual friends", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });
    jest.spyOn(accountQueries, "getMutualFriendsQuery").mockReturnValue({ rows: [ {mutual_friends: []} ]});

    const res = await request(app)
      .post("/api/get_mutual_friends")
      .send({ user_id: 1, other_username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.mutual_friends).toEqual([]);
  });

  it("should return 200 if everything is good and there are mutual friends", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: 1 });
    jest.spyOn(accountQueries, "getMutualFriendsQuery").mockReturnValue({ rows: [ {mutual_friends: ["testing2"]} ]});

    const res = await request(app)
      .post("/api/get_mutual_friends")
      .send({ user_id: 1, other_username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.mutual_friends).toEqual(["testing2"]);
  });
});
