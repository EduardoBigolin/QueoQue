import "dotenv/config";
import { test, expect } from "vitest";
import { SingUpService } from "../../api/services/SingUpService";
import { faker } from "@faker-js/faker";

// test("Should return a user", async () => {
//   const input = {
//     name: faker.name.firstName(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
//   const output = await SingUpService.execute(input);
//   expect(1).toBe(1);
// });
