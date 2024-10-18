# Azle REST API with ckBTC Integration

This boilerplate is designed to easily build ExpressJS applications usin ckBTC (a Bitcoin pair) on ICP.

## Features

- Build REST API on chain
- Work with SQL databases
- Persist database on chain
- Make ckBTC transactions

## Run Locally

Clone the project

```bash
  git clone https://github.com/adrian-d-hidalgo/azle-ckbtc
```

Go to the project directory

```bash
  cd azle-ckbtc
```

Install dependencies

```bash
  npm install
```

```bash
# only for mac
codesign -s - .bitcoin/bin/bitcoind
```

```bash
npm run btc:start
```

In another terminal run:

```bash
npm run icp:start
```

Open another terminal and run:

```bash
npm run icp:deploy:local
```

# How to mint ckBTC

Run the following command:

```bash
# only for mac
codesign -s - .bitcoin/bin/bitcoin-cli
```

```bash
npm run btc:mint --address=$ADDRESS
```

After minting, call the method `updateBalance` to update the account balance.

Then, you can verify the account balance in this endpoint: `getBalance`
