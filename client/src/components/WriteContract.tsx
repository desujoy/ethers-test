import simpleStorage from "@/lib/SimpleStorage";
import {
  useWaitForTransactionReceipt,
  useWriteContract,
  type BaseError,
} from "wagmi";

interface WriteContractProps {
  functionName: string;
  args?: any;
}

export default function WriteContract({
  functionName,
  args,
}: WriteContractProps) {
  const { data: hash, isPending, writeContract, error } = useWriteContract();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const args = Array.from(formData.entries()).map(([name, value]) => ({
      name,
      value,
    }));
    console.log(args.map((arg) => arg.value));
    writeContract({
      abi: simpleStorage.simpleAbi,
      chainId: simpleStorage.chainid,
      address: simpleStorage.simpleAddress,
      functionName,
      args: args.map((arg) => arg.value),
    });
  }
  //   console.log(error as BaseError);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <form onSubmit={submit}>
      {args?.map((arg: any) => {
        return (
          <div key={arg.name}>
            <label>
              {arg.name}
              <input name={arg.name} required />
            </label>
          </div>
        );
      })}
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
