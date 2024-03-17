import { simpleAbi, simpleAddress } from "@/lib/SimpleStorage";
import { config } from "@/wagmi";
import { deserialize } from "v8";
import { Abi } from "viem";
import {
  serialize,
  useConnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { readContract, writeContract } from "wagmi/actions";

export async function Contract() {
  const abi = simpleAbi as Abi;
  const contractAddress = simpleAddress
  let result;
  let result1;
  try {
    result = await readContract(config, {
      abi,
      chainId: 1337,
      address: contractAddress,
      functionName: "retrieve",
      // args: ["0"],
    });
    console.log(JSON.parse(serialize(result)).value);
    result1 = await writeContract(config, {
      abi,
      chainId: 1337,
      address: contractAddress,
      functionName: "addPerson",
      args: ["0x123", 123],
    });
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <h1>Contract</h1>
      {result && <p>Result: {JSON.parse(serialize(result)).value}</p>}
    </>
  );
}
