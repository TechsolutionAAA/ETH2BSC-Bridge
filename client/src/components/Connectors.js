import { Connectors } from "web3-react";

const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4, 56, 97] });

const Infura = new NetworkOnlyConnector({
    providerURL: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
});

const connectors = { MetaMask, Infura };
export default connectors;