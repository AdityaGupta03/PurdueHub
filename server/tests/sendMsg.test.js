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
      .post("/api/msg_user")
      .send();
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing user_id field.");
  });

  it("should return 400 if username is missing", async () => {
    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1" });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing username field.");
  });

  it("should return 400 if message is missing", async () => {
    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta" });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing message field.");
  });

  it("should return 400 if title is missing", async () => {
    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units" });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing title field.");
  });

  it("should return 500 if getUserInfoQuery fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoQuery").mockReturnValue(false);

    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units", title: "Testing" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error!");
  });

  it("should return 404 if getUserInfoFromUsernameQuery fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue(null);

    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units", title: "Testing" });

    console.log(res.body);
    
    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("User to send email to does not exist.");
  });

  it("should return 400 if user is blocked", async () => {
    jest.spyOn(accountQueries, "getUserInfoQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: "2", email: "test@example.com" });
    jest.spyOn(accountQueries, "checkUserBlocked").mockReturnValue(true);

    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units", title: "Testing" });

    console.log(res.body);
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Sender is blocked by user.");
  });

  it("should return 400 if user is not followed and toggle on", async () => {
    jest.spyOn(accountQueries, "getUserInfoQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: "2", email: "test@example.com" });
    jest.spyOn(accountQueries, "checkUserBlocked").mockReturnValue(false);
    jest.spyOn(accountQueries, "isOnlyFollowing").mockReturnValue(true);
    jest.spyOn(accountQueries, "isFollowing").mockReturnValue(false);

    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units", title: "Testing" });

    console.log(res.body);
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("User does not accept messages from everyone.");
  });

  it("should return 500 if sendEmail fails", async () => {
    jest.spyOn(accountQueries, "getUserInfoQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: "2", email: "test" });
    jest.spyOn(accountQueries, "checkUserBlocked").mockReturnValue(false);
    jest.spyOn(accountQueries, "isOnlyFollowing").mockReturnValue(false);

    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units", title: "Testing" });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.error).toEqual("Internal Server Error!");
  });

  it("should return 200 if everything is good and toggle on", async () => {
    jest.spyOn(accountQueries, "getUserInfoQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: "2", email: "test@example.com" });
    jest.spyOn(accountQueries, "checkUserBlocked").mockReturnValue(false);
    jest.spyOn(accountQueries, "isOnlyFollowing").mockReturnValue(true);
    jest.spyOn(accountQueries, "isFollowing").mockReturnValue(true);

    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units", title: "Testing" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully sent message.");
  });

  it("should return 200 if everything is good and toggle off", async () => {
    jest.spyOn(accountQueries, "getUserInfoQuery").mockReturnValue(true);
    jest.spyOn(accountQueries, "getUserInfoFromUsernameQuery").mockReturnValue({ user_id: "2", email: "test@example.com" });
    jest.spyOn(accountQueries, "checkUserBlocked").mockReturnValue(false);
    jest.spyOn(accountQueries, "isOnlyFollowing").mockReturnValue(false);

    let res = await request(app)
      .post("/api/msg_user")
      .send({ user_id: "1", username: "gupta", msg: "testing units", title: "Testing" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Successfully sent message.");
  });

});