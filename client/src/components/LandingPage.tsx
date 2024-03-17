"use client";
// export const runtime = 'edge';

import { Account } from "@/components/Account";
import { config } from "@/wagmi";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  UseBalanceReturnType,
  deserialize,
  serialize,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

export default function LandingPage() {
  // const [balance, setBalance] = useState<UseBalanceReturnType>();
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const address =
    account.status === "connected" ? account.addresses[0] : undefined;
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });
  const balancehook = useBalance({
    address: account.status === "connected" ? account.addresses[0] : undefined,
    chainId:
      account.status === "connected"
        ? account.chainId === 1 ||
          account.chainId === 11155111 ||
          account.chainId === 1337
          ? account.chainId
          : undefined
        : undefined,
  });
  const balance = balancehook.status === "success" ? balancehook.data : 0;

  // if (account.status === "connected") {
  //   // console.log(account);
  //   const balance = useBalance({ address: account.addresses[0], chainId: account.chainId });
  //   if (balance) {
  //     setBalance(balance);
  //   }
  // }

  // function getBalance(address: any, chainId: any) {
  //   if (account.status !== "connected") return;
  //   const balance = useBalance({ address, chainId });
  //   return balance;
  // }

  // useEffect(() => {
  //   if (account.status !== "connected") return;
  //   const balance = getBalance(account.addresses[0], account.chainId);
  //   if (balance) {
  //     setBalance(balance);
  //   }
  // }, [account.addresses, account.chainId]);
  return (
    <>
      <div>
        <h2 className="m-4 text-2xl font-bold">Account</h2>

        <div className="m-4">
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          {balance != 0 && (
            <>
              balance: {deserialize(balance.formatted) + " " + balance.symbol}{" "}
              <br />{" "}
            </>
          )}
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && <Account />}
      </div>

      <div className="m-4">
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div className="m-4 text-green-500">{status}</div>
        <div>{error?.message}</div>
      </div>
      <div className="">
        <Link href="/contract">
          <button
            className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
          >
            Contract
          </button>
        </Link>
        <Link href="/transact">
          <button
            className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            type="button"
          >
            Transact
          </button>
        </Link>
      </div>
    </>
  );
}
