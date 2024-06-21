export {};

export type Roles = "founder" | "applicant";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      onboardingComplete?: boolean;
    };
  }
}
