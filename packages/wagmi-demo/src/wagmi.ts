import { sepolia } from "viem/chains"
import { http, createConfig } from "wagmi"
import { coinbaseWallet } from "wagmi/connectors"

// TODO: Replace with your Pimlico API key
// @ts-ignore
const pimlicoApiKey = import.meta.env.VITE_PIMLICO_API_KEY;

console.log("pimlicoApiKey",import.meta.env,pimlicoApiKey);
export const config = createConfig({
    chains: [sepolia],
    connectors: [
        coinbaseWallet({
            appName: "Pimlico Test",
            preference: "smartWalletOnly"
        })
    ],
    transports: {
        [sepolia.id]: http("https://sepolia.base.org")
    }
})

export const capabilities = {
    paymasterService: {
        [sepolia.id]: {
            url: `https://api.pimlico.io/v2/${sepolia.id}/rpc?apikey=${pimlicoApiKey}`
        }
    }
}

declare module "wagmi" {
    interface Register {
        config: typeof config
    }
}
