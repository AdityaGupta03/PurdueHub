const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");

describe("Testing chatbot API:", () => {
  let consoleLogSpy, consoleErrSpy;

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 if user_statement is missing", async () => {
    const res = await request(app)
      .post("/api/chat_bot")
      .send({});

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual("Missing user statement field.");
  });

  it("should return 200 if everything is good", async () => {
    const res = await request(app)
      .post("/api/chat_bot")
      .send({ user_statement: "Hello World" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message.role).toEqual("assistant");
    expect(res.body.message.content).not.toEqual("");
  });
});
