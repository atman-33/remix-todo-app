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
