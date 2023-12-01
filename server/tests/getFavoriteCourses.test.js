const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const courseQueries = require("../database/queries/courseQueries");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing getting all favorite courses API:", () => {
  let consoleLogSpy, consoleErrSpy;

  beforeEach(async () => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrSpy.mockRestore();
  });

  it("should return 400 if missing fields", async () => {
    const res = await request(app)
      .post("/api/get_fav_courses")
      .send({});

    expect(res.statusCode).toEqual(400);
  });

  it("should return 500 if internal server error", async () => {
    jest.spyOn(accountQueries, "getFavoriteCoursesQuery").mockReturnValue(null);
    const res = await request(app)
      .post("/api/get_fav_courses")
      .send({ user_id: "1", course_name: "Testing Course" });

    expect(res.statusCode).toEqual(500);
  });

  it("should return 200 if everything is good", async () => {
    jest.spyOn(accountQueries, "getFavoriteCoursesQuery").mockReturnValue([]);
    const res = await request(app)
      .post("/api/get_fav_courses")
      .send({ user_id: "1", course_name: "Testing Course" });

    expect(res.statusCode).toEqual(200);
  });
});
