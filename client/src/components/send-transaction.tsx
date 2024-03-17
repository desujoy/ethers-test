"use client";

import * as React from "react";
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseEther } from "viem";
import { Account } from "./Account";

export function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();
  const account = useAccount();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as `0x${string}`;
    const value = formData.get("value") as string;
    sendTransaction({
      to,
      value: parseEther(value),
      chainId:
        account.status === "connected"
          ? account.chainId === 1 ||
            account.chainId === 11155111 ||
            account.chainId === 1337
            ? account.chainId
            : undefined
          : undefined,
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <form
        onSubmit={submit}
        className="max-w-sm mx-auto my-8 p-4 bg-white rounded-md shadow-md"
      >
        <div className="flex flex-col space-y-4">
          <input
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            name="address"
            placeholder="0xA0Cf…251e"
            required
          />
          <input
            className="w-full mb-4 p-2 rounded-md border border-gray-300"
            name="value"
            placeholder="0.05"
            required
          />
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending || isConfirming || isConfirmed}
            type="submit"
          >
            {isPending ? "Confirming..." : "Send"}
          </button>
          {hash && (
            <div className="mt-4 bg-yellow-200 text-black overflow-auto">
              Transaction Hash: {hash}
            </div>
          )}
          {isConfirming && (
            <div className="mt-4 bg-green-300 text-black">
              Waiting for confirmation...
            </div>
          )}
          {isConfirmed && (
            <div className="mt-4 bg-green-700 text-black">
              Transaction confirmed.
            </div>
          )}
          {error && (
            <div className="mt-4 bg-red-700 text-black">
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}
        </div>
      </form>
      <div className="m-4">
        <Account />
      </div>
    </div>
  );
}
