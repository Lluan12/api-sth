import request, { Response } from "supertest";
import mongoose from "mongoose";
import app from "../../src/app";
import { DB_NAME, DB_URI, SALT } from "../../src/configuration/config";
import userModel from "../../src/models/user.model";
import bcrypt from "bcrypt";

interface User {
	name: string;
	email: string;
	password: string;
	created: Date;
	updated: Date;
}

const password = "12345678";
console.log(SALT);
const passwordHash = bcrypt.hashSync(password, SALT!);

const userValid: User = {
	created: new Date(Date.now()),
	updated: new Date(Date.now()),
	email: "lluancet@gmail.com",
	name: "lluan",
	password: passwordHash,
};
describe("test for the API", () => {
	beforeAll(async () => {
		const url = DB_URI!;
		await mongoose.connect(url, { dbName: DB_NAME });
		userModel.create(userValid);
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});

	describe("GET /api/users", () => {
		let response: Response;

		beforeEach(async () => {
			const tokenRespnse = await request(app)
				.post("/api/users/login")
				.send({ email: userValid.email, password: password });
			const token = tokenRespnse.body["token"];
			console.log(tokenRespnse);
			response = await request(app)
				.get("/api/users")
				.set("Authorization", token);
		});

		test("failed - lacking token - 401", async () => {
			const badResponse = await request(app).get("/api/users");
			expect(badResponse.status).toBe(401);
		});

		test("the route works", async () => {
			expect(response.status).toBe(200);
			expect(response.headers["Content-Type"]).toContain("json");
		});

		test("the request return a list of users", () => {
			expect(response.body).toBeInstanceOf(Array);
		});
	});

	describe("GET /api/users/:id - sucecess - get a user", () => {});

	describe("POST /api/users - sucecess - get all the books", () => {});

	describe("PUT /api/users - sucecess - get all the books", () => {});
});
