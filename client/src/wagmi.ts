import { Abi } from "viem";
import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { Chain, localhost, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia, localhost],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Create Wagmi" }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID! }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [localhost.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
