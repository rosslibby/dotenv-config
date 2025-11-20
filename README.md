# @notross/dotenv-config

A simple client that makes environment variables available as objects.

Features:
- Access ENV as an object
- Access specific variable groups by passing a prefix
- Combine ENV variables via templating

## Installation
```bash
# NPM
npm install @notross/dotenv-config

# Yarn
yarn add @notross/dotenv-config
```

## Quickstart
#### 1. Set up your `.env` as usual
```properties
# .env

MONGO_DB=test
MONGO_USERNAME=admin
MONGO_PASSWORD=secret
MONGO_HOST=localhost
MONGO_PORT=27017

ALPACA_API_KEY_ID=XXXXXXXXXXXXXXXXXXXX
ALPACA_API_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

#### 2. Access your ENV variables using camel-cased keys from the `env(...)` method
```ts
// database.ts

import { env } from '@notross/dotenv-config'

const { mongo } = env() // returns each .env entry
                        // prefixed with "MONGO_"
const {
  username, // MONGO_USERNAME
  password, // MONGO_PASSWORD
  host,     // MONGO_HOST
  port,     // MONGO_PORT
} = mongo

const mongoURI = `mongodb://${username}:${password}@${host}:${port}`
```

## How it works
Let's take our example `.env` file:

```properties
# .env

MONGO_DB=test
MONGO_USERNAME=admin
MONGO_PASSWORD=secret
MONGO_HOST=localhost
MONGO_PORT=27017

ALPACA_API_KEY_ID=XXXXXXXXXXXXXXXXXXXX
ALPACA_API_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Each variable name is separated into two parts:
- Prefix
- Key

The **prefix** will be accessible as a lowercase key of the `env(...)` return object:

```ts
env().alpaca
```

The keys will be camel-cased, accessible through the `env(...)` object's **prefix**:

```ts
const { apiKeyId, apiSecretKey } = env().alpaca
```

> ⚠️ Prefixes and camel-casing are only automatically detected if they are delineated by an underscore:
<br>
> `PREFIX_VARIABLE_NAME=value` --> `prefix: { variableName: 'value' }`

<br>

You may access various sets of ENV variables via prefix from the `env(...)` object:

```ts
const { alpaca, mongo } = env()
```

## Prefixes

You may access specific variables by passing the prefix to the `env(...)` method

```properties
# .env

ALPACA_API_KEY_ID=XXXXXXXXXXXXXXXXXXXX
ALPACA_API_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```ts
// markets.ts

import { env } from '@notross/dotenv-config'

const { keyId, secretKey } = env('ALPACA_API')

const headers = new Headers({
  'accept': 'application/json',
  'APCA-API-KEY-ID', keyId,
  'APCA-API-SECRET-KEY': secretKey,
})
```

## Templating
Templating provides an easy way to dynamically construct variables using existing ENV values.

Example
```properties
# .env

MONGO_USERNAME=admin
MONGO_PASSWORD=secret
MONGO_HOST=localhost
MONGO_PORT=27017

# Combine the MONGO_ variables to form a connection string
MONGO_URI=mongodb+srv://{{username}}:{{password}}@{{host}}:{{port}}
```

```ts
// database.ts

import { env } from '@notross/dotenv-config'
import { MongoClient } from 'mongodb'

const { mongo: { uri } } = env()

const client = new MongoClient(uri)
```

---
## License
MIT © [@notross](https://rosslibby.com)
