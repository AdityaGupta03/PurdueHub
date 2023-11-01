const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("Testing verify email API:", () => {
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

  it("should return 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/verify_email")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing email");
  });

  it("should return 400 if authCode is missing", async () => {
    const res = await request(app)
      .post("/api/verify_email")
      .send({
        email: "test@example.com"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing authCode");
  });

  it("should return 500 if getAuthCodeQuery fails", async () => {
    jest.spyOn(verificationQueries, "getAuthCodeQuery").mockImplementation(() => {
      return "";
    });

    const res = await request(app)
      .post("/api/verify_email")
      .send({
        email: "test@example.com",
        authCode: "123456"
      });
    
      expect(res.statusCode).toEqual(500);
      expect(res.body.error).toEqual("Internal server error");
  });

  it("should return 400 if authCode is incorrect", async () => {
    jest.spyOn(verificationQueries, "getAuthCodeQuery").mockImplementation(() => {
      return "234567";
    });

    const res = await request(app)
      .post("/api/verify_email")
      .send({
        email: "test@example.com",
        authCode: "123456"
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Incorrect authentication code");
  });

  it("should return 500 if removeEmailVerificationQuery fails", async () => {
    jest.spyOn(verificationQueries, "getAuthCodeQuery").mockImplementation(() => {
      return "234567";
    });

    jest.spyOn(verificationQueries, "removeEmailVerificationQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/verify_email")
      .send({
        email: "test@example.com",
        authCode: "234567"
      });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal server error");
  });

  it("should return 200 if everything is good", async () => {
    jest.spyOn(verificationQueries, "getAuthCodeQuery").mockImplementation(() => {
      return "123456";
    });

    jest.spyOn(verificationQueries, "removeEmailVerificationQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/verify_email")
      .send({
        email: "test@example.com",
        authCode: "123456"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully verified email");
  });
});