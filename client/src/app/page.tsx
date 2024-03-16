"use client";

import { config } from "@/wagmi";
import { useEffect, useState } from "react";
import {
  UseBalanceReturnType,
  deserialize,
  serialize,
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
} from "wagmi";
import { localhost, sepolia } from "wagmi/chains";

function App() {
  // const [balance, setBalance] = useState<UseBalanceReturnType>();
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
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
        <h2>Account</h2>

        <div>
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

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
