const request = require("supertest");
const { app } = require("../server");
const pool = require("../database/db");
const courseQueries = require("../database/queries/courseQueries");
const accountQueries = require("../database/queries/accountQueries");

describe("Testing getting class info API:", () => {
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
      .post("/api/is_fav_course")
      .send({});

    expect(res.statusCode).toEqual(400);
  });

  it("should return 200 if everything is good and course is favorited", async () => {
    jest.spyOn(courseQueries, "getCourseID").mockReturnValue(1);
    jest.spyOn(accountQueries, "isFavoriteCourseQuery").mockReturnValue(true);
    const res = await request(app)
      .post("/api/is_fav_course")
      .send({ user_id: "1", course_name: "Testing Course" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isFav).toEqual(true);
  });

  it("should return 200 if everything is good and course is not favorited", async () => {
    jest.spyOn(courseQueries, "getCourseID").mockReturnValue(1);
    jest.spyOn(accountQueries, "isFavoriteCourseQuery").mockReturnValue(false);
    const res = await request(app)
      .post("/api/is_fav_course")
      .send({ user_id: "1", course_name: "Testing Course" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.isFav).toEqual(false);
  });
});
