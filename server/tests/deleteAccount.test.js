const request = require("supertest");

const { app } = require("../server");
const pool = require("../database/db");
const accountController = require("../controllers/accountController");
const accountQueries = require("../database/queries/accountQueries");
const calendarQueries = require("../database/queries/calendarQueries"); 

describe("Testing deleteAccount API:", () => {
  
  let consoleLogSpy, consoleErrSpy;

  beforeAll(async () => {
    await pool.query("DELETE FROM email_verification");
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM email_verification WHERE email IN (SELECT email FROM users)");
    await pool.query("DELETE FROM users");
    await pool.query("DELETE FROM calendars");
    await pool.end();
  });

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 if username is missing", async () => {
    let res = await request(app)
      .post("/api/delete_account")
      .send();
    
      expect(res.statusCode).toEqual(400);
      expect(res.body.error).toEqual("Missing username field.");
  });

  it("should return 404 if the username does not exist", async () => {
    let res = await request(app)
      .post("/api/delete_account")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Account not found.");
  });

  it("should return 500 if some deleteAccount fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockReturnValue(true);
    jest.spyOn(accountController, "deleteAccount").mockReturnValue(false);
    
    let res = await request(app)
      .post("/api/delete_account")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error!");
  });

  it("should return 200 if everything is good", async () => {
    let user = "testuser";
    let pass = "testuser";
    let mail = "test@example.com";

    let res = await request(app)
      .post("/api/create_account")
      .send({ username: user, password: pass, email: mail });

    expect(res.statusCode).toEqual(200);

    res = await request(app)
      .post("/api/delete_account")
      .send({ username: user });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully deleted account.");
  });

});