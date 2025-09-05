import { TEST_USER } from "@/tests/e2e/utils/constants";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash(TEST_USER.password, 10);

  await prisma.user.upsert({
    where: { username: TEST_USER.username },
    update: {},
    create: {
      email: TEST_USER.email,
      username: TEST_USER.username,
      password: passwordHash,
    },
  });

  console.log("Database seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
