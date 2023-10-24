const request = require("supertest");
const pool = require("../database/db");
const { app } = require("../server");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing toggleDM API:", () => {

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
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 if user_id is missing", async () => {
    let res = await request(app)
      .post("/api/toggle_dm")
      .send();
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing user_id field.");
  });

  it("should return 400 if option is missing", async () => {
    let res = await request(app)
      .post("/api/toggle_dm")
      .send({ user_id: "1" });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing option field.");
  });

  it("should return 400 if option is invalid", async () => {
    let res = await request(app)
      .post("/api/toggle_dm")
      .send({ user_id: "1", option: "4" });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Invalid option.");
  });

  it("should return 500 if toggleDM fails", async () => {
    jest.spyOn(accountQueries, "toggleDM").mockReturnValue(false);

    let res = await request(app)
      .post("/api/toggle_dm")
      .send({ user_id: "1", option: "1" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error!");
  });

  it("should return 200 if everything is good", async () => {
    jest.spyOn(accountQueries, "toggleDM").mockReturnValue(true);

    res = await request(app)
      .post("/api/toggle_dm")
      .send({ user_id: "1", option: "1" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully updated option.");
  });

});