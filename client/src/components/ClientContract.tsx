"use client";

import simpleStorage from "@/lib/SimpleStorage";
import { useState } from "react";
import { serialize, useReadContract } from "wagmi";
import ReadContract from "./ReadContract";
import ReadContractArgs from "./ReadContractArgs";
import WriteContract from "./WriteContract";

export default function ClientContract() {
  const [result, setResult] = useState(false);
  const [result1, setResult1] = useState(false);
  const [result2, setResult2] = useState(false);

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex flex-col space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setResult(true)}
        >
          Retrieve
        </button>
        {result && <ReadContract functionName={"retrieve"} />}
      </div>
      <div className="flex flex-col space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setResult1(true)}
        >
          List Of Persons
        </button>
        {result1 && (
          <ReadContractArgs
            functionName={"listOfPersons"}
            args={[
              { internalType: "uint256", name: "", type: "uint256", value: 0 },
            ]}
          />
        )}
      </div>
      <div className="flex flex-col space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setResult2(true)}
        >
          Name To Fav Number
        </button>
        {result2 && (
          <ReadContractArgs
            functionName={"nameToFavNumber"}
            args={[
              {
                internalType: "string",
                name: "",
                type: "string",
                value: "sujoy",
              },
            ]}
          />
        )}
      </div>
      <div className="flex flex-col space-x-2">
        <WriteContract
          functionName="store"
          args={[
            {
              internalType: "uint256",
              name: "_favouriteNunmber",
              type: "uint256",
            },
          ]}
        />
      </div>
      <div className="flex flex-col space-x-2">
        <WriteContract
          functionName="addPerson"
          args={[
            { internalType: "string", name: "_name", type: "string" },
            {
              internalType: "uint256",
              name: "_favouriteNumber",
              type: "uint256",
            },
          ]}
        />
      </div>
    </div>
  );
}
