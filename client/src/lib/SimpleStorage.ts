import { Abi } from "viem";

export const simpleAddress: `0x${string}` = `0xF06De75d004cB3aAB82894e069803FB33E964526`;

export const simpleAbi: Abi = [
    {
      inputs: [
        { internalType: "string", name: "_name", type: "string" },
        { internalType: "uint256", name: "_favouriteNumber", type: "uint256" },
      ],
      name: "addPerson",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "listOfPersons",
      outputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "uint256", name: "favouriteNumber", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "", type: "string" }],
      name: "nameToFavNumber",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "retrieve",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_favouriteNunmber", type: "uint256" },
      ],
      name: "store",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  