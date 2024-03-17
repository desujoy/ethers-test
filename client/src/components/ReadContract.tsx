"use client";

import { simpleAbi, simpleAddress } from "@/lib/SimpleStorage";
import { serialize, useReadContract } from "wagmi";

export default function ReadContract() {
  const result = JSON.parse(
    serialize(
      useReadContract({
        abi: simpleAbi,
        chainId: 1337,
        address: simpleAddress,
        functionName: "retrieve",
      })
    )
  );
//   console.log(result);
  return(
    <>
      {result.status === "pending" && <p>Loading...</p>}
      {result.status === "success" && <p>Result: {result.data.value}</p>}
    </>
  );
}
