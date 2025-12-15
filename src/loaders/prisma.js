import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

let prisma;

export default async function prismaLoader() {
  if (!prisma) {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter }); // ✔ Required in Prisma 7

    await prisma.$connect();
    console.log("Prisma 7 + PostgreSQL connected");
  }

  return prisma;
}

export const getPrisma = () => prisma;
