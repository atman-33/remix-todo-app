import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { prisma } from '~/lib/prisma.server';

export const action = async ({ params }: ActionFunctionArgs) => {
  await prisma.todo.delete({
    where: { id: params.id },
  });
  console.log(`id ${params.id} deleted`);
  return redirect('/todos');
};
