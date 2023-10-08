const request = require("supertest");
const app = require("../server");
const pool = require("../database/db");
const helperFuncs = require("../controllers/helperFunctions");
const accountController = require("../controllers/accountController");
const accountQueries = require("../database/queries/accountQueries");
const verificationQueries = require("../database/queries/verificationQueries");

describe("resetUsername API", () => {
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

    it("should return 400 if email is not provided", async () => {
        const res = await request(app).post("/api/reset_username").send({});
        expect(res.statusCode).toEqual(400);
    });

    it("should return 404 if email is not found", async () => {
        const res = await request(app)
            .post("/api/reset_username")
            .send({ email: "nonexistent@example.com" });
        expect(res.statusCode).toEqual(404);
    });

    it("should return 200 if email is found and username is reset", async () => {
        // create a test user
        const testUser = {
            username: "testuser",
            email: "test@example.com",
            password: "password",
        };
        const create_res = await request(app).post("/api/create_account").send(testUser);
        expect(create_res.statusCode).toEqual(200);

        // send reset username request
        const res = await request(app)
            .post("/api/reset_username")
            .send({ email: testUser.email });
        expect(res.statusCode).toEqual(204);

        // check that username is reset
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [testUser.email]);
        expect(user.rows[0].username).not.toEqual(testUser.username);
    });
});