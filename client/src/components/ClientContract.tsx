"use client";

import { simpleAbi, simpleAddress } from "@/lib/SimpleStorage";
import { useState } from "react";
import { serialize, useReadContract } from "wagmi";
import ReadContract from "./ReadContract";

export default function ClientContract() {
  const [result, setResult] = useState(false);

  return (
    <>
      <h1>Contract</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setResult(true)}>Get Result</button>
      {result && <ReadContract />}
    </>
  );
}
