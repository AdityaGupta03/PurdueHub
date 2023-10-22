const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const helperFuncs = require("../controllers/helperFunctions");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("Testing resetPassword API:", () => {
  let consoleLogSpy, consoleErrSpy;

  beforeAll(async () => {
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
      .post("/api/request_new_password")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username field");
  });

  it("should return 404 if username does not exist", async () => {
    const res = await request(app)
      .post("/api/request_new_password")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("No account found with username provided");
  });

  it("should return 500 if getUserInfoFromUsernameQuery fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/request_new_password")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });

  it("should return 500 if sendEmail fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(helperFuncs, "sendEmail").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/request_new_password")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Error sending email");
  });

  it("should return 500 if addPasswordResetQuery fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(helperFuncs, "sendEmail").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "addPasswordResetQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/request_new_password")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });

  it("should return 200 if request is successful", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(helperFuncs, "sendEmail").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "addPasswordResetQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/request_new_password")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully sent email");
  });
});