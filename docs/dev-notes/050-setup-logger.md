# ロガーセットアップ

**仕様**  

- ログをファイル出力すること。

## ステップ

### インストール

```sh
npm install pino
```

### logerを作成（server向け）

`app/lib/logger.server.ts`

```ts
import fs from 'fs';
import path from 'path';
import pino from 'pino';

// ログファイルのパスを設定
const logDir = path.resolve('logs');
const logPath = path.join(logDir, 'app.log');

// ログディレクトリが存在しない場合は作成
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// ログファイルのストリームを作成
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

export const logger = pino({}, logStream);
```

### gitignore設定

`.gitignore`

```text
# log
/logs
```

### 利用例

e.g.  

```ts
export const action = async ({ request }: ActionFunctionArgs) => {
  logger.info('logger: todo creating...');
  // ...
```
