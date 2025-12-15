import prismaLoader from "../src/loaders/prisma.js";
import spots from "./seed-data/spots.ts";
import users from "./seed-data/users.ts";

const prisma = await prismaLoader();

async function main() {
  console.log("🌱 Starting database seed...");

  await prisma.spot.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  });

  await prisma.spot.createMany({
    data: spots,
  });

  console.log("✅ Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
