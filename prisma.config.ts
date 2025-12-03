import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL, // URL goes here!
  },
  migrations: {
    path: "prisma/migrations",
  },
});
