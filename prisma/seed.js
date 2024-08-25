import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  console.log('start db seeding...🚀');
  await prisma.todo.create({
    data: {
      title: 'todo1',
      done: true,
    },
  });
  console.log('end db seeding🌙');
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // eslint-disable-next-line no-undef
    process.exit(1);
  });
