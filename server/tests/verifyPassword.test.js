const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("Testing verify password authCode API:", () => {
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
      .post("/api/verify_password_reset_code")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username field");
  });

  it("should return 500 if getUserInfoFromUsernameQuery fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/verify_password_reset_code")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });

  it("should return 400 if authCode is missing", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/verify_password_reset_code")
      .send({ username: "testuser" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing authCode field");
  });

  it("should return 500 if getPasswordAuthCodeQuery fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "getPasswordAuthCodeQuery").mockImplementation(() => {
      return "";
    });

    const res = await request(app)
      .post("/api/verify_password_reset_code")
      .send({ username: "testuser", authCode: "123456" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal server error");
  });

  it("should return 400 if authCode is incorrect", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "getPasswordAuthCodeQuery").mockImplementation(() => {
      return "234567";
    });

    const res = await request(app)
      .post("/api/verify_password_reset_code")
      .send({ username: "testuser", authCode: "123456" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Incorrect authentication code");
  });

  it("should return 500 if removeUsernameVerificationQuery fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "getPasswordAuthCodeQuery").mockImplementation(() => {
      return "234567";
    });

    jest.spyOn(verificationQueries, "removeUsernameVerificationQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/verify_password_reset_code")
      .send({ username: "testuser", authCode: "234567" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal server error");
  });

  it("should return 200 if everything is good", async () => {
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "getPasswordAuthCodeQuery").mockImplementation(() => {
      return "123456";
    });

    jest.spyOn(verificationQueries, "removeUsernameVerificationQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/verify_password_reset_code")
      .send({ username: "testuser", authCode: "123456" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully entered authentication code");
  });
});