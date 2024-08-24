import { Label } from '@radix-ui/react-label';
import { type ActionFunctionArgs } from '@remix-run/node';
import { Form, redirect } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { prisma } from '~/lib/prisma.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title');

  if (typeof title !== 'string') {
    throw new Error('invalid type');
  }
  await prisma.todo.create({
    data: {
      title,
      done: false,
    },
  });
  return redirect('/todos');
};

const TodosNewPage = () => {
  return (
    <div>
      <Form method="post" className="bg-lime-2 flex items-end space-x-4">
        <div>
          <Label htmlFor="title">todo名</Label>
          <Input name="title" id="title" />
        </div>
        <Button type="submit">作成</Button>
      </Form>
    </div>
  );
};

export default TodosNewPage;
