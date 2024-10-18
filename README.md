# Azle REST API with ckBTC Integration

This boilerplate is designed to easily build ExpressJS applications usin ckBTC (a Bitcoin pair) on ICP.

## Table of Contents

- [Setup](#setup)
- [How it Works](#how-it-works)

## Setup

Ensure the following are installed on your system:

- [DFX](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `0.22.0`
- [Mops](https://j4mwm-bqaaa-aaaam-qajbq-cai.ic0.app/docs/install)
- [Node.js](https://nodejs.org/en/) `>= 20`

## How it Works

### Start Project

To start the project, open three terminals.

Start the Bitcoin service in the first terminal:

```bash
codesign -s - .bitcoin/bin/bitcoind # Only for MacOS users
npm run btc:start
```

In another terminal, start the ICP service:

```bash
npm run icp:start
```

In a third terminal, deploy all canisters:

```bash
npm run icp:deploy:local
```

### Mint ckBTC

Get your deposit address by calling the `getDepositAddress` method.
Dian
Mint blocks to receive rewards for the given address:

```bash
codesign -s - .bitcoin/bin/bitcoin-cli # Only for MacOS users
npm run btc:mint --address=$ADDRESS
```

After minting, update the account balance by calling the `updateBalance` method.

You can verify the account balance using the `getBalance` endpoint (balance is shown in Satoshis).

### Transfer ckBTC to Another Principal

Use the `transfer` method, providing the target principal and the amount.
