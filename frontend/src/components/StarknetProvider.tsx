"use client";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  alchemyProvider,
  argent,
  braavos,
  infuraProvider,
  lavaProvider,
  nethermindProvider,
  reddioProvider,
  StarknetConfig,
  voyager,
  useInjectedConnectors,
} from "@starknet-react/core";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

interface StarknetProviderProps {
  children: React.ReactNode;
}

export function StarknetProvider({ children }: StarknetProviderProps) {
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "always",
  });

  const connectors = [
    ...injected,
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  const apiKey = process.env.NEXT_PUBLIC_API_KEY!;
  const nodeProvider = process.env.NEXT_PUBLIC_PROVIDER!;

  let provider;
  if (nodeProvider == "infura") {
    provider = infuraProvider({ apiKey });
  } else if (nodeProvider == "alchemy") {
    provider = alchemyProvider({ apiKey });
  } else if (nodeProvider == "lava") {
    provider = lavaProvider({ apiKey });
  } else if (nodeProvider == "nethermind") {
    provider = nethermindProvider({ apiKey });
  } else if (nodeProvider == "reddio"){
    provider = reddioProvider({ apiKey });
  }

  return (
    <StarknetConfig
      connectors={connectors}
      chains={[mainnet, sepolia]}
      provider={provider}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
