import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Department, Remote } from "@prisma/client";
import { z } from "zod";

export const companyRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        department: z.array(z.nativeEnum(Department)).optional(),
        commitment: z.array(z.string()).optional(),
        industry: z.array(z.string()).optional(),
        experience: z.array(z.string()).optional(),
        location: z.string().optional(),
        remote: z.array(z.nativeEnum(Remote)).optional(),
        stage: z.array(z.string()).optional(),
        demographic: z.array(z.string()).optional(),
        headcountLowerBound: z.number().optional(),
        headcountUpperBound: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log("input", input);
      return ctx.db.company.findMany({
        where: {
          headCount: {
            gte: input.headcountLowerBound,
            lte: input.headcountUpperBound,
          },
        },
        include: {
          JobListings: {
            where: {
              AND: [
                {
                  OR: input.remote?.map((remote) => ({
                    remote,
                  })),
                },
                {
                  OR: input.department?.map((department) => ({
                    department,
                  })),
                },
              ],
              // commitment: input.commitment,
              // headCount: {
              //   gte: input.headcountLowerBound,
              //   lte: input.headcountUpperBound,
              // },
              // industry: input.industry,
              // experience: input.experience,
              // location: input.location,
              // remote: input.remote,
              // stage: input.stage,
              // demographic: input.demographic,
            },
          },
        },
      });
    }),

  getCompany: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.company.findUnique({
        where: {
          id: input.id,
        },
        include: {
          JobListings: true,
          founders: true,
        },
      });
    }),

  getJobListing: publicProcedure
    .input(z.object({ jobId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.jobListing.findUnique({
        where: {
          id: input.jobId,
        },
        include: {
          Company: {
            include: {
              JobListings: true,
            },
          },
        },
      });
    }),
});
