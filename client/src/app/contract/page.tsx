// export const runtime = 'edge';

import ClientContract from "@/components/ClientContract";
import { Contract } from "@/components/Contract";

export default function App() {
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold">Wagmi</h1>
      <p className="mt-4">
        Welcome to the Wagmi demo. This is a simple example of how to use the
        Wagmi library to connect to a blockchain and interact with a smart
        contract.
      </p>
      <p className="mt-4">
        This demo is built with{" "}
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
          React
        </a>{" "}
        and{" "}
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          Next.js
        </a>
        . It uses{" "}
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noreferrer"
        >
          TypeScript
        </a>{" "}
        and{" "}
        <a href="https://www.ethereum.org/" target="_blank" rel="noreferrer">
          Ethereum
        </a>{" "}
        for the blockchain.
      </p>
      <p className="mt-4">
        To get started, connect your wallet and interact with the smart contract
        below.
      </p>
      {/* <Contract /> */}
      <ClientContract />
    </div>
  );
}
