const request = require("supertest");
const { app } = require("../server");

const courseQueries = require("../database/queries/courseQueries");

describe('Testing searchClasses functionality', () => {
    let consoleLogSpy, consoleErrSpy;

    beforeEach(async () => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
        consoleErrSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
        consoleErrSpy.mockRestore();
    });

    it("should return 500 when courseQueries.getAllClasses() query fails", async () => {
        jest.spyOn(courseQueries, "getAllClasses").mockImplementation(() => {
            throw new Error("Error")
        });
        let res = await request(app)
            .get("/api/get_all_classes");

        expect(res.statusCode).toEqual(500);
    });

    it("should return 200 with classes", async () => {
        jest.spyOn(courseQueries, "getAllClasses").mockImplementation(() => {
            return [];
        });
        let res = await request(app)
            .get("/api/get_all_classes");

        expect(res.statusCode).toEqual(200);
    });
});
