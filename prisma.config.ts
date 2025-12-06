import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",

  // 🔴 CHANGE THIS: Was 'databases', needs to be 'datasource'
  datasource: {
    provider: "postgresql",
    url: process.env.DATABASE_URL!,
  },

  migrations: {
    path: "./prisma/migrations",
  },
});