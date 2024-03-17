'use client'

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Contract() {
    const account = useAccount();
    const { connectors, connect, status, error } = useConnect();
    const { disconnect } = useDisconnect();
    
  return <></>;
}
