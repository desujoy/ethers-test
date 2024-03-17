import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { isConnected, address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const formattedAddress = address;

  return (
    <>
      {isConnected && (
        <div className="flex items-center space-x-4 m-10 ">
          <div className="flex items-center space-x-4 ">
            {ensAvatar ? (
              <img
                className="h-10 w-10 rounded-full"
                alt="ENS Avatar"
                src={ensAvatar}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200" />
            )}
            <div className="flex flex-col">
              {address && (
                <div className="text-sm font-medium">
                  {ensName
                    ? `${ensName} (${formattedAddress})`
                    : formattedAddress}
                </div>
              )}
              <div className="text-xs text-gray-500">
                Connected to {connector?.name} Connector
              </div>
            </div>
          </div>
          <button
            className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => disconnect()}
            type="button"
          >
            Disconnect
          </button>
        </div>
      )}
    </>
  );
}
