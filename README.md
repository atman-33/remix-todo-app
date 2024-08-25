# Welcome to Remix

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

## 技術スタック

### フロントエンド（client）

| パッケージ   | 説明                       |
| ------------ | -------------------------- |
| Tailwind CSS | CSSフレームワーク          |
| shadcn/ui    | コンポーネントライブラリ   |
| Zod          | バリデーションライブラリ   |
| Conform      | Formライブラリ   |
| Storybook    | UIコンポーネント開発環境   |
| Zustand      | 状態管理ライブラリ         |

### バックエンド（server）

| パッケージ | 説明                                                               |
| ---------- | ------------------------------------------------------------------ |
| Prisma     | ORMライブラリ                                                      |
| pino       | ログライブラリ                                                     |
| Jest       | テストフレームワーク                                               |
