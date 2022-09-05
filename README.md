# Hardhat Boilerplate

## Installation

Try install libraries the following tasks:

#### 1. Install library

```bash
yarn
```

#### 2. Add dotenv file

```dotenv
<!-- .env -->
HARDHAT_NETWORK='baobab'
CYPRESS_URL='https://public-node-api.klaytnapi.com/v1/cypress'
BAOBAB_URL= 'https://api.baobab.klaytn.net:8651'

PRIVATE_KEY= <TYPE_YOUR_PRIVATE_KEY>
```

- **HARDHAT_NETWORK :** The network name you created in the hardhat config file. Used to interact with the network through hre.
- **CYPRESS_URL, BAOBAB_URL :** JSON-RPC url
- **PRIVATE_KEY :** your wallet private key

#### 3. Test

```bash
yarn compile
```

If the compile is successful, it is installed correctly.

#### The folder hierarchy is as follows

```bash
├── contracts
│   └── Token.sol               // solidity code sample
├── scripts
│   ├── contractExecution.ts    // execute contract sample
│   ├── deploy.ts               // deploy by hre sample
│   └── deployWithCaver.ts      // deploy by caver-js sample
├── test
│   └── Token.ts                // test code sample
├── .env                        // dotenv(Add it yourself!)
├── .gitignore
├── .prettierrc.json
├── hardhat.config.ts           // hardhat config
├── package.json
├── README.md
└── tsconfig.json
```

## Major tasks

#### 1. Compile

```bash
yarn compile
```

Running this code will create folders `artifacts`, `cache`, and `typechain-types`.

#### 2. Test

```bash
yarn test test/Token.ts
```

#### 3. Run script

```bash
yarn script scripts/deploy.ts
```
