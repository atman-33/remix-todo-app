import { Form, json, Link, useLoaderData } from '@remix-run/react';
import { Button } from '~/components/shadcn/ui/button';
import { Separator } from '~/components/shadcn/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/shadcn/ui/table';
import { prisma } from '~/lib/prisma.server';

export const loader = async () => {
  const todos = await prisma.todo.findMany();
  return json(todos);
};

const TodosPage = () => {
  const todos = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold">Todosページ</h1>
        <Link to="new">
          <Button>新規</Button>
        </Link>
      </div>

      <Separator className="mb-4 mt-2 border-2 border-gray-400" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>todo名</TableHead>
            <TableHead>進捗</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-yellow-100">
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="w-4/12">{todo.title}</TableCell>
              <TableCell className="w-4/12">{todo.done ? '完了' : '未了'}</TableCell>
              <TableCell className="w-4/12 space-x-2">
                <Link to={`${todo.id}/edit`}>
                  <Button>編集</Button>
                </Link>
                <Form className="inline-block" action={`${todo.id}/delete`} method="DELETE">
                  <Button variant="destructive">削除</Button>
                </Form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodosPage;
