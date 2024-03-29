import simpleStorage from "@/lib/SimpleStorage";
import { useState } from "react";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

interface WriteContractProps {
  functionName: string;
  payable: boolean;
  args?: any;
}

export default function WriteContract({
  functionName,
  payable,
  args,
}: WriteContractProps) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();
  const [value, setValue] = useState<string>("0");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const args = Array.from(formData.entries()).map(([name, value]) => ({
      name,
      value,
    }));
    console.log(args.map((arg) => arg.value));
    if (payable) {
      writeContract({
        abi: simpleStorage.simpleAbi,
        chainId: simpleStorage.chainid,
        address: simpleStorage.simpleAddress,
        functionName,
        args: args.map((arg) => arg.value),
        value: BigInt(value),
      });
    } else {
      writeContract({
        abi: simpleStorage.simpleAbi,
        chainId: simpleStorage.chainid,
        address: simpleStorage.simpleAddress,
        functionName,
        args: args.map((arg) => arg.value),
      });
    }
  }
  //   console.log(error as BaseError);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form className="flex flex-col space-x-2" onSubmit={submit}>
      {args?.map((arg: any) => {
        return (
          <div className="flex flex-col space-x-2" key={arg.name}>
            <label>{arg.name}</label>
            <input
              className="rounded border border-gray-400 p-2 my-4"
              name={arg.name}
              required
            />
          </div>
        );
      })}
      {payable && (
        <div className="flex flex-col space-x-2">
          <label>Value</label>
          <input
            className="rounded border border-gray-400 p-2 my-4"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Confirming..." : "Submit"}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </form>
  );
}
