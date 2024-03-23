"use client";

import { useState } from "react";
import ReadContract from "./ReadContract";
import ReadContractArgs from "./ReadContractArgs";
import WriteContract from "./WriteContract";
import { useAccount } from "wagmi";
import { Account } from "./Account";

export default function ClientContract() {
  const [result, setResult] = useState(false);
  const [result1, setResult1] = useState(false);
  const [result2, setResult2] = useState(false);

  const account = useAccount();

  const [listOfPersons, setListOfPersons] = useState(0);
  const [nameToFavNumber, setNameToFavNumber] = useState("");

  return (
    <>
      {account.status === "connected" && <Account />}
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
          <form
            className="flex flex-col space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              setListOfPersons(target.listOfPersons.value);
            }}
          >
            <label className="flex flex-col space-x-2">List of Persons</label>
            <input
              className="rounded border border-gray-400 p-2 my-4"
              type="number"
              name="listOfPersons"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setResult1(true)}
            >
              List Of Persons
            </button>
            {result1 && (
              <>
                <ReadContractArgs
                  functionName={"listOfPersons"}
                  args={[
                    {
                      internalType: "uint256",
                      name: "",
                      type: "uint256",
                      value: listOfPersons,
                    },
                  ]}
                />
              </>
            )}
          </form>
        </div>
        <div className="flex flex-col space-x-2">
          <form
            className="flex flex-col space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              setNameToFavNumber(target.nameToFavNumber.value);
            }}
          >
            <label>Name</label>
            <input
              className="rounded border border-gray-400 p-2 my-4"
              type="text"
              name="nameToFavNumber"
            />
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
                    value: nameToFavNumber,
                  },
                ]}
              />
            )}
          </form>
        </div>
        <div className="flex flex-col space-x-2">
          <WriteContract
          payable={false}
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
          payable={false}
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
    </>
  );
}
