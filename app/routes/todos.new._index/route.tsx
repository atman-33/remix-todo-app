import { getFormProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Label } from '@radix-ui/react-label';
import { type ActionFunctionArgs } from '@remix-run/node';
import { Form, json, redirect, useActionData } from '@remix-run/react';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { z } from 'zod';
import { Alert, AlertDescription, AlertTitle } from '~/components/shadcn/ui/alert';
import { Button } from '~/components/shadcn/ui/button';
import { Input } from '~/components/shadcn/ui/input';
import { logger } from '~/lib/logger.server';
import { prisma } from '~/lib/prisma.server';

const schema = z.object({
  title: z.string({ required_error: 'Title is required' }),
});

export const action = async ({ request }: ActionFunctionArgs) => {
  logger.info('logger: todo creating...');
  console.log('console: todo creating...');

  const formData = await await request.formData();
  const submission = parseWithZod(formData, { schema });

  if (submission.status !== 'success') {
    return json({
      success: false,
      message: 'error!',
      submission: submission.reply(), // NOTE: conformでエラー情報を整形して返している
    });
  }

  const { title } = submission.value;

  await prisma.todo.create({
    data: {
      title,
      done: false,
    },
  });
  return redirect('/todos');

  // NOTE: データを返す際は下記のように書く
  // return json({
  //   success: true,
  //   message: 'success!!',
  //   submission: submission.reply(),
  // });
};

const TodosNewPage = () => {
  const data = useActionData<typeof action>();
  const [form, { title }] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    console.log(data);
    // NOTE: action成功時は下記のように書く
    // if (data.success) {
    //   alert(data.message);
    // }
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <Form method="POST" className="bg-lime-2 flex items-end space-x-4" {...getFormProps(form)}>
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input name="title" id="title" />
        </div>
        <Button type="submit">作成</Button>
      </Form>
      {title.errors && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          {title.errors.map((e, index) => (
            <AlertDescription key={index}>
              <p>{e}</p>
            </AlertDescription>
          ))}
        </Alert>
      )}
    </div>
  );
};

export default TodosNewPage;
