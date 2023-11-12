const request = require("supertest");
const pool = require("../database/db");
const { app } = require("../server");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing getAdvice API:", () => {

  let consoleLogSpy, consoleErrSpy;

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 200 with advice not equal to testing advice", async () => {
    let res = await request(app)
      .get("/api/get_advice");

    expect(res.statusCode).toEqual(200);
    expect(res.body.advice).not.toEqual("Testing: Failed");
  });

});