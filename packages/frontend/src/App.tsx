import "./App.css";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { HomeScreen } from "./Screens";
import { Theme } from "./Utils";
import { DAppKitProvider, WalletConnectOptions } from "@vechain/dapp-kit-react";

const walletConnectOptions: WalletConnectOptions = {
    projectId: "a0b855ceaf109dbc8426479a4c3d38d8",
    metadata: {
        name: "Sample VeChain dApp",
        description: "A sample VeChain dApp",
        url: window.location.origin,
        icons: [`${window.location.origin}/images/logo/my-dapp.png`],
    },
};

function App() {
    const { colorMode } = useColorMode();

    return (
        <ChakraProvider theme={Theme}>
            <DAppKitProvider
                nodeUrl="https://testnet.vechain.org/"
                genesis="test"
                usePersistence
                walletConnectOptions={walletConnectOptions}
                themeMode={colorMode === "dark" ? "DARK" : "LIGHT"}
                themeVariables={{
                    "--vdk-color-dark-primary": "rgba(255, 255, 255, 0.08)",
                    "--vdk-color-dark-primary-hover":
                        "rgba(255, 255, 255, 0.16)",
                    "--vdk-color-dark-primary-active":
                        "rgba(255, 255, 255, 0.24)",
                    "--vdk-color-dark-secondary": "#2D3748",
                    "--vdk-color-light-primary": "#EDF2F7",
                    "--vdk-color-light-primary-hover": "#E2E8F0",
                    "--vdk-color-light-primary-active": "#CBD5E0",
                }}
                logLevel="DEBUG"
            >
                <HomeScreen />
            </DAppKitProvider>
        </ChakraProvider>
    );
}

export default App;
