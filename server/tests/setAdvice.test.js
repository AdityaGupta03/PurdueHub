const request = require("supertest");
const pool = require("../database/db");
const { app } = require("../server");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing setAdvice API:", () => {

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
    await pool.query("DELETE FROM email_verification");
    await pool.query("DELETE FROM users");
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 when missing user_id", async () => {
    let res = await request(app)
      .post("/api/set_advice_setting")
      .send();

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing user_id field.");
  });

  it("should return 400 when missing toggleAdvice", async () => {
    let res = await request(app)
      .post("/api/set_advice_setting")
      .send({ user_id: 1 });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing toggleAdvice field.");
  });

  it("should return 400 when invalid option", async () => {
    let res = await request(app)
      .post("/api/set_advice_setting")
      .send({ user_id: 1, toggleAdvice: 34 });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Invalid option.");
  });

  it("should return 500 if query error", async() => {
    jest.spyOn(accountQueries, 'setAdviceQuery').mockReturnValue(false);

    let res = await request(app)
      .post("/api/set_advice_setting")
      .send({ user_id: 1, toggleAdvice: 1});

    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error.");
  });

  it("should return 200 if everything is good", async() => {
    let createAcc = await request(app)
        .post("/api/create_account")
        .send({ username: "testing", password: "testing", email: "testing@example.com" });
    
    expect(createAcc.statusCode).toEqual(200);
    
    jest.spyOn(accountQueries, 'setAdviceQuery').mockReturnValue(true);

    let uid = createAcc.body.user_id;
    let res = await request(app)
        .post("/api/set_advice_setting")
        .send({ user_id: uid, toggleAdvice: 1});

    expect(res.statusCode).toEqual(200);
  });

});