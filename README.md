# @notross/dotenv-config

A simple client that makes environment variables available as objects.

## Installation
```bash
# NPM
npm install @notross/dotenv-config

# Yarn
yarn add @notross/dotenv-config
```

## Usage

```properties
# Alpaca
ALPACA_API_KEY_ID=XXXXXXXXXXXXXXXXXXXX
ALPACA_API_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# MongoDB
MONGO_DB=test
MONGO_USERNAME=admin
MONGO_PASSWORD=secret
MONGO_HOST=localhost
MONGO_PORT=27017
```

```ts
// config.ts

import { buildEnv } from '@notross/dotenv-config';

export const alpacaEnv = buildEnv({ prefix: 'ALPACA_' });
export const mongoEnv = buildEnv({ prefix: 'MONGO_' });
```

```ts
// database.ts
import { mongoEnv } from './config';

const { db, username, password, host, port } = mongoEnv;

const uri = `mongodb://${username}:${password}@${host}:${port}`l
const mongoClient = new MongoClient();
const database = mongoClient.db(db);
```

```ts
// api.ts
import { alpacaEnv } from './config';j

const headers = {
  accept: 'application/json',
  'APCA-API-KEY-ID': alpacaEnv.keyId,
  'APCA-API-SECRET-KEY': alpacaEnv.secretKey,
};

fetch('https://data.alpaca.markets/v2/stocks/quotes/latest', { headers });
```
---
## License
MIT © [@notross](https://rosslibby.com)
