const request = require("supertest");
const app = require("../server");
const pool = require("../database/db");
const helperFuncs = require("../controllers/helperFunctions");
const accountController = require("../controllers/accountController");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("createAccount", () => {
    let backendServer;

  beforeAll((done) => {
    backendServer = app.listen(3001, (err) => {
      if (err) return done(err);
      done();
    });
  });

  afterAll((done) => {
    backendServer.close(done);
  });

  beforeAll(async () => {
    await pool.query("DELETE FROM users");
  });

  afterAll(async () => {
    await pool.query("DELETE FROM email_verification WHERE email IN (SELECT email FROM users)");
    await pool.query("DELETE FROM users");
    await pool.end();
  });

  it("should return 400 if username is missing", async () => {
    const res = await request(app)
      .post("/api/create_account")
      .send({ email: "test@example.com", password: "password" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username");
  });

  it("should return 400 if email is missing", async () => {
    const res = await request(app)
      .post("/api/create_account")
      .send({ username: "testuser", password: "password" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing email");
  });

  it("should return 400 if password is missing", async () => {
    const res = await request(app)
      .post("/api/create_account")
      .send({ username: "testuser", email: "test@example.com" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing password");
  });

  it("should return 400 if username is not unique", async () => {
    await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", ["testuser", "test@example.com", "password"]);
    const res = await request(app)
      .post("/api/create_account")
      .send({ username: "testuser", email: "test2@example.com", password: "password" });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Not unique username");
  });

  it("should return 500 if createAccountQuery fails", async () => {
    jest.spyOn(pool, "query").mockImplementation(() => {
      throw new Error({ message: "Expected error"});
    });
    
    const res = await request(app)
      .post("/api/create_account")
      .send({ username: "testuser", email: "test@example.com", password: "password" });
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Error creating account");
  });

  it("should return 500 if sendEmailVerification fails", async () => {
    jest.spyOn(helperFuncs, "generateAuthCode").mockImplementation(() => {
      return "123456";
    });
    jest.spyOn(accountController, "sendEmailVerification").mockImplementation(() => {
      return false;
    });
    jest.spyOn(accountQueries, "isUniqueUsernameQuery").mockImplementation(() => {
      return true;
    });
    jest.spyOn(accountQueries, "createAccountQuery").mockImplementation(() => {
      return true;
    });
    const res = await request(app)
      .post("/api/create_account")
      .send({ username: "testuser", email: "test@example.com", password: "password" });
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Error sending verfication to email");
  });

  it("should return 200 if account is created successfully", async () => {
    jest.spyOn(helperFuncs, "generateAuthCode").mockImplementation(() => {
      return "123456";
    });
    jest.spyOn(accountQueries, "isUniqueUsernameQuery").mockImplementation(() => {
      return true;
    });
    jest.spyOn(accountQueries, "createAccountQuery").mockImplementation(() => {
      return true;
    });
    jest.spyOn(verificationQueries, "addEmailVerificationQuery").mockImplementation(() => {
      return true;
    });
    jest.spyOn(helperFuncs, "sendEmail").mockImplementation(() => {
      return true;
    });

    const res = await request(app)
      .post("/api/create_account")
      .send({ username: "testuser", email: "test@example.com", password: "password" });
    expect(res.statusCode).toEqual(200);
  });
});