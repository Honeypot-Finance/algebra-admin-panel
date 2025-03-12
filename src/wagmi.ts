import { defineChain } from "viem";
import { configureChains, createConfig } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";

const superseed = defineChain({
  id: 80094,
  name: "Berachain",
  network: "berachain-testnet",
  nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.berachain.com/"],
    },
    public: {
      http: ["https://rpc.berachain.com/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Berachain Explorer",
      url: "https://berascan.com/",
    },
  },
});

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [superseed],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: "Algebra Integral Admin Panel",
          description: "Admin Panel",
          url: "https://admin.algebra.finance",
          icons: [""],
        },
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
