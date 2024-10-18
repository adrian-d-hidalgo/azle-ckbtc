import { IDL, update, Principal, call, id, caller } from "azle";
import { Account, TransferArgs, TransferResult } from "azle/canisters/icrc";

import { padPrincipalWithZeros } from "./utils";
import {
  GetBtcAddressArgs,
  UpdateBalanceArgs,
  UpdateBalanceResult,
} from "./minter";

export default class {
  private minter = Principal.fromText(process.env.CKBTC_MINTER_CANISTER_ID!);
  private ledger = Principal.fromText(process.env.CKBTC_LEDGER_CANISTER_ID!);

  @update([], IDL.Text)
  async getDepositAddress(): Promise<string> {
    return await call(this.minter, "get_btc_address", {
      paramIdlTypes: [GetBtcAddressArgs],
      returnIdlType: IDL.Text,
      args: [
        {
          owner: [id()],
          subaccount: [padPrincipalWithZeros(caller().toUint8Array())],
        },
      ],
    });
  }

  @update([], UpdateBalanceResult)
  async updateBalance(): Promise<UpdateBalanceResult> {
    const updateBalanceResult: UpdateBalanceResult = await call(
      this.minter,
      "update_balance",
      {
        paramIdlTypes: [UpdateBalanceArgs],
        returnIdlType: UpdateBalanceResult,
        args: [
          {
            owner: [id()],
            subaccount: [padPrincipalWithZeros(caller().toUint8Array())],
          },
        ],
      }
    );

    return updateBalanceResult;
  }

  @update([], IDL.Nat64)
  async getBalance(): Promise<bigint> {
    let balance = await call(this.ledger, "icrc1_balance_of", {
      paramIdlTypes: [Account],
      returnIdlType: IDL.Nat,
      args: [
        {
          owner: id(),
          subaccount: [padPrincipalWithZeros(caller().toUint8Array())],
        },
      ],
    });

    return balance;
  }

  @update([IDL.Principal, IDL.Nat], TransferResult)
  async transfer(to: Principal, amount: bigint): Promise<TransferResult> {
    return await call(this.ledger, "icrc1_transfer", {
      paramIdlTypes: [TransferArgs],
      returnIdlType: TransferResult,
      args: [
        {
          from_subaccount: [padPrincipalWithZeros(caller().toUint8Array())],
          to: {
            owner: id(),
            subaccount: [padPrincipalWithZeros(to.toUint8Array())],
          },
          amount,
          fee: [],
          memo: [],
          created_at_time: [],
        },
      ],
    });
  }
}
