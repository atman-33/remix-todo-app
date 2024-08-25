import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { z } from 'zod';
import Alerts from '~/components/shadcn/custom/alerts';
import { Button } from '~/components/shadcn/ui/button';
import { Input } from '~/components/shadcn/ui/input';
import { Label } from '~/components/shadcn/ui/label';
import { RadioGroup, RadioGroupItem } from '~/components/shadcn/ui/radio-group';
import { prisma } from '~/lib/prisma.server';

const schema = z.object({
  title: z.string({ required_error: 'Title is required' }),
  done: z.string().refine((value) => value === 'true' || value === 'false', {
    message: 'Status must be either "true" or "false"',
  }),
});

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const todo = await prisma.todo.findUnique({
    where: { id: params.id },
  });

  if (!todo) {
    return json({
      success: false,
      message: `id ${params.id} not found!`,
      data: null,
    });
  }

  return json({
    success: true,
    message: 'success',
    data: todo,
  });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json({
      success: false,
      message: 'error!',
      submission: submission.reply(),
    });
  }

  const { title, done } = submission.value;

  await prisma.todo.update({
    where: { id: params.id },
    data: {
      title,
      done: done === 'true',
    },
  });
  console.log('updated!!');

  return redirect('/todos');
};

const TodosEditPage = () => {
  const todo = useLoaderData<typeof loader>();
  const [form, { title, done }] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    if (todo.success === false) {
      console.log(todo.message);
      return;
    }
  }, [todo]);

  return (
    <div className="flex flex-col gap-4">
      <Form method="post" className="bg-lime-2 flex items-end space-x-4" {...getFormProps(form)}>
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input defaultValue={todo.data?.title} name="title" id="title" />
        </div>

        <RadioGroup
          defaultValue={todo.data?.done ? 'true' : 'false'}
          className="flex h-10"
          name="done"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="not-done" />
            <Label htmlFor="not-done">未了</Label>
          </div>
          <div className="flex shrink-0 items-center space-x-2">
            <RadioGroupItem value="true" id="done" />
            <Label htmlFor="done">完了</Label>
          </div>
        </RadioGroup>

        <Button type="submit">更新</Button>
      </Form>
      <Alerts alerts={title.errors} />
      <Alerts alerts={done.errors} />
    </div>
  );
};

export default TodosEditPage;
