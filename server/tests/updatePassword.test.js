const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("Testing update password API:", () => {
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
      .post("/api/update_password")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username field");
  });
  
  it("should return 400 if password is missing", async () => {
    const res = await request(app)
      .post("/api/update_password")
      .send({
        username: "testuser",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing password field");
  });

  it("should return 500 if updatePasswordQuery fails", async () => {
    jest.spyOn(accountQueries, "updatePasswordQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/update_password")
      .send({
        username: "testuser",
        password: "testpassword",
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal server error");
  });

  it("should return 200 if everything is good", async () => {
    jest.spyOn(accountQueries, "updatePasswordQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/update_password")
      .send({
        username: "testuser",
        password: "testpassword",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully updated password");
  });
});