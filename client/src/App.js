import './App.css';
import './Responsive.App.css';
import LandingPage from './components/LandingPage';
import Navbar from "./components/Navbar";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer, cssTransition } from 'react-toastify';
import getLibrary from './getLibrary';
import connectors from './components/Connectors';
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const bounce = cssTransition({
    enter: "animate__animated animate__bounceIn",
    exit: "animate__animated animate__bounceOut"
  });

  return (
    <Web3ReactProvider connectors={connectors} getLibrary={getLibrary} libraryName={'ethers.js' | 'web3.js' | null}>
      <div className="App flex col">
        <Navbar />
        <LandingPage />
      </div>
      <ToastContainer transition={bounce} />
    </Web3ReactProvider>
  );
}

export default App;
