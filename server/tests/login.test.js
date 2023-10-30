const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("Testing login API:", () => {
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
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 if username is missing", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({});
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username");
  });

  it("should return 400 if password is missing", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing password");
  });

  it("should return 400 if username does not exist", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("No account found with username provided");
  });

  it("should return 400 if account is banned", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "checkBannedQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Account is banned");
  });

  it("should return 400 if account is deleted", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "checkBannedQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "checkDeleteQuery").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Account is deleted");
  });

  it("should return 500 if getUserInfoFromUsernameQuery fails", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "checkBannedQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "checkDeleteQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return null;
    });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });

  it("should return 400 if account is not verified", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "checkBannedQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "checkDeleteQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "checkVerifiedEmail").mockImplementation(() => {
      return false;
    });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Email not yet verified. Check for email to your purdue email.");
  });

  it("should return 400 if password is incorrect", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "checkBannedQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "checkDeleteQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "checkVerifiedEmail").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "loginQuery").mockImplementation(() => {
      return -1;
    });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Incorrect password");
  });

  it("should return 200 if everything is correct", async () => {
    jest.spyOn(accountQueries, "checkAccountFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "checkBannedQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "checkDeleteQuery").mockImplementation(() => {
      return false;
    });

    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockImplementation(() => {
      return true;
    });

    jest.spyOn(verificationQueries, "checkVerifiedEmail").mockImplementation(() => {
      return true;
    });

    jest.spyOn(accountQueries, "loginQuery").mockImplementation(() => {
      return 1;
    });

    const res = await request(app)
      .post("/api/login")
      .send({ username: "testuser", password: "password" });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.user_id).toEqual(1);
  });
});