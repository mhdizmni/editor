export default {
    providers: [
      {
        domain: process.env.NODE_ENV !== "production" ? "https://relaxed-condor-6.clerk.accounts.dev/" : "https://clerk.mitism.com",
        applicationID: "convex",
      },
    ]
  };