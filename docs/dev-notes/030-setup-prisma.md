# Prismaセットアップ

## ステップ

### インストール

```sh
npm install prisma --save-dev
```

### スキーマファイル作成

- sqliteを利用するためのコマンドを実行し、`schema.prisma`を生成する。

```sh
npx prisma init --datasource-provider sqlite
```

`prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Todo {
  id    String  @id @default(uuid())
  title String
  done  Boolean
}
```

### マイグレーションを実行

`package.json`

```json
  "scripts": {
    "db:migrate:dev": "npx env-cmd -f .env npx prisma migrate dev"
    // ...
  }
```

### seedファイルを作成（必要に応じて）

`prisma/seed.js`

```js
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
```

- db seed実行コマンド

```sh
node prisma/seed.js
```

### PrismaClientをシングルトンで利用するための実装

- シングルトンを利用する処理を追加し、prismaClientはシングルトンで利用する。
- Remixではserver.tsという拡張子を付けることで、サーバーでのみ実行可能なモジュールとして定義できる。

`app/utils/singleton.server.ts`

```ts
export const singleton = <Value>(name: string, valueFactory: () => Value): Value => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = global as any;
  g.__singletons ??= {};
  g.__singletons[name] ??= valueFactory();
  return g.__singletons[name];
};
```

`app/lib/prisma.server.ts`

```ts
import { PrismaClient } from '@prisma/client';
import { singleton } from '~/utils/singleton.server';

export const prisma = singleton('prisma', () => new PrismaClient());
```
