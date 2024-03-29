"use client";

import simpleStorage from "@/lib/SimpleStorage";
import { serialize, useReadContract } from "wagmi";

interface Props {
  functionName: string;
}

export default function ReadContract(props: Props) {
  const result = JSON.parse(
    serialize(
      useReadContract({
        abi: simpleStorage.simpleAbi,
        chainId: simpleStorage.chainid,
        address: simpleStorage.simpleAddress,
        functionName: props.functionName,
      })
    )
  );
  //   console.log(result);
  return (
    <>
      {result.status === "pending" && <p>Loading...</p>}
      {result.status === "success" && (
        <p className="bg-green-400 text-black p-4 m-0 rounded">
          Result: {result.data.value}
        </p>
      )}
      {result.status === "error" && (
        <p className=" bg-red-400 text-black p-4 m-0 rounded">
          {result.failureReason.name}:
          <br />
          {result.failureReason.shortMessage}
        </p>
      )}
    </>
  );
}
