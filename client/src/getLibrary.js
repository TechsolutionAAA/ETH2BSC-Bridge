import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { Web3Provider } from "@ethersproject/providers";

const getLibrary = (provider) => {
    return new Web3Provider(provider);
}

export default getLibrary;