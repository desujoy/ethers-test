import { Abi } from "viem";
import { localhost, sepolia } from "viem/chains";

const simpleAddress: `0x${string}` = `0xdB497004590F5D824F84050C4Dfb9ac9baBeC287`;

const simpleAbi = [
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

const simpleStorage = {
  simpleAddress,
  simpleAbi,
  chainid: sepolia.id,
};


export default simpleStorage;