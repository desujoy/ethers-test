"use client";

import simpleStorage from "@/lib/SimpleStorage";
import { serialize, useReadContract } from "wagmi";

interface Props {
  functionName: string;
  args?: any;
}

export default function ReadContract(props: Props) {
  const result = JSON.parse(
    serialize(
      useReadContract({
        abi: simpleStorage.simpleAbi,
        chainId: simpleStorage.chainid,
        address: simpleStorage.simpleAddress,
        functionName: props.functionName,
        args: props.args.map((arg: any) => arg.value),
      })
    )
  );
  console.log(result);
  function getValues(result: any) {
    if (Array.isArray(result.data)) {
      return result.data.map((value: any) => {
        // <p>{JSON.stringify(value)}</p>
        if (typeof value === "object") {
          return <p>Data: {value.value}</p>;
        } else return <p>Name: {value}</p>;
      });
    } else return result.data.value;
  }
  return (
    <>
      {result.status === "pending" && <p>Loading...</p>}
      {result.status === "success" && (
        <p className="bg-green-400 text-black p-4 m-0 rounded">
          Result: {getValues(result)}
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
