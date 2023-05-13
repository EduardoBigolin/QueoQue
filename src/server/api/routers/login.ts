import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "n/server/api/trpc";
import { SingUpService } from "n/server/api/services/SingUpService";

export const loginRouter = createTRPCRouter({
  signIn: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  signUp: publicProcedure
    .input(
      z.object({ name: z.string(), email: z.string(), password: z.string() })
    )
    .mutation(async ({ input }) => {
      const service = await SingUpService.execute(input);
      return service;
    }),
});
