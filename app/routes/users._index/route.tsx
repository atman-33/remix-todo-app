import { json, useLoaderData } from '@remix-run/react';
import { Separator } from '~/components/shadcn/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/shadcn/ui/table';

export const loader = async () => {
  // NOTE: APIを呼ぶ場合はfetch関数で呼び出す
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = (await res.json()) as {
    id: string;
    name: string;
    username: string;
  }[];

  return json({
    success: true,
    message: null,
    data: users,
  });
};

const UsersPage = () => {
  const users = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="text-2xl font-bold">Usersページ</h1>

      <Separator className="mb-4 mt-2 border-2 border-gray-400" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>名前</TableHead>
            <TableHead>ユーザー名</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-purple-100">
          {users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
