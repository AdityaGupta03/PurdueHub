const request = require("supertest");
const pool = require("../database/db");
const { app } = require("../server");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing messageUser API:", () => {

  let consoleLogSpy, consoleErrSpy;

  beforeAll(async () => {
    await pool.query("DELETE FROM email_verification");
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM email_verification");
    await pool.query("DELETE FROM users");
    await pool.end();
  });

  beforeEach(async () => {
    await pool.query("DELETE FROM email_verification");
    await pool.query("DELETE FROM users");
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 if search is missing", async () => {
    let res = await request(app)
      .post("/api/search_users")
      .send();
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing search field");
  });

  it("should return 200 if there is an exact match", async () => {
    let res = await request(app)
      .post("/api/create_account")
      .send({ username: "aditya", password: "gupta", email: "td@example.com" });
    expect(res.statusCode).toEqual(200);

    res = await request(app)
        .post("/api/search_users")
        .send({ search: "aditya" });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.users).toEqual(["aditya"]);
  });

  it("should return 500 if getAllUsernames fails", async () => {
    jest.spyOn(accountQueries, "getAllUsernames").mockReturnValue(null);

    let res = await request(app)
      .post("/api/search_users")
      .send({ search: "testing" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal server error");
  });

  it("should return 200 if there are no users", async () => {
    jest.spyOn(accountQueries, "getAllUsernames").mockReturnValue([]);

    let res = await request(app)
      .post("/api/search_users")
      .send({ search: "aditya" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.users).toEqual([]);
  });

  it("should return 200 if everything is good", async () => {
    const fakeData = [
        { username: "aditya" },
        { username: "adittya" },
        { username: "adii" },
        { username: "aditya2" },
        { username: "adiotya3" },
        { username: "verydifferentusername" },
    ]
    jest.spyOn(accountQueries, "getAllUsernames").mockReturnValue(fakeData);

    let res = await request(app)
      .post("/api/search_users")
      .send({ search: "adityya" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.users).toEqual(["aditya", "adittya", "aditya2", "adiotya3",  "adii"]);
  });

});