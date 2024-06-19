import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  getSavedJobs: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.savedJobs.findUnique({
        where: {
          userId: input.userId,
        },
      });
    }),
  addFavoriteJob: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        jobId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.savedJobs.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,
          FavoriteJobs: [input.jobId],
        },
        update: {
          FavoriteJobs: {
            push: input.jobId,
          },
        },
      });
    }),
  removeFavoriteJob: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        jobId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentFavoriteJobs = await ctx.db.savedJobs.findUnique({
        where: {
          userId: input.userId,
        },
      });

      if (!currentFavoriteJobs) {
        return;
      }

      currentFavoriteJobs.FavoriteJobs =
        currentFavoriteJobs.FavoriteJobs.filter(
          (jobId) => jobId !== input.jobId,
        );

      return ctx.db.savedJobs.update({
        where: {
          userId: input.userId,
        },
        data: {
          FavoriteJobs: currentFavoriteJobs.FavoriteJobs,
        },
      });
    }),
  addHiddenJob: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        jobId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.savedJobs.upsert({
        where: {
          userId: input.userId,
        },
        create: {
          userId: input.userId,
          HiddenJobs: [input.jobId],
        },
        update: {
          HiddenJobs: {
            push: input.jobId,
          },
        },
      });
    }),
  removeHiddenJob: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        jobId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const currentHiddenJobs = await ctx.db.savedJobs.findUnique({
        where: {
          userId: input.userId,
        },
      });

      if (!currentHiddenJobs) {
        return;
      }

      currentHiddenJobs.HiddenJobs = currentHiddenJobs.HiddenJobs.filter(
        (jobId) => jobId !== input.jobId,
      );

      return ctx.db.savedJobs.update({
        where: {
          userId: input.userId,
        },
        data: {
          HiddenJobs: currentHiddenJobs.HiddenJobs,
        },
      });
    }),
});
