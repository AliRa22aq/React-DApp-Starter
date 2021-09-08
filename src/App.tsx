import './App.css';
import React, { useEffect, useState } from "react"
import Web3 from "web3";

function App() {

  const [data, setData] = useState({userAddress: ""});

  window.ethereum.on('accountsChanged', function (accounts: string[]) {
    setData(pre => { return { ...pre, userAddress: accounts[0] } })
  })


  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      console.log(window.web3.currentProvider.isMetaMask)

      // Get current logged in user address
      const accounts = await window.web3.eth.getAccounts()
      setData(pre => { return { ...pre, userAddress: accounts[0] } })
      console.log(accounts[0])

    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  useEffect(() => {
    loadWeb3()
  }, [])



  return (
    <div className="App">
      <h2> Let's DeFi </h2>
      <br />
      {
        data.userAddress ?
          <div>You are login with Address: {data.userAddress}</div> :
          <>
            <div>Please Signin to Metamask</div>
            <br />
            <button onClick={() => loadWeb3()}> Connect </button>
          </>
      }

      <br />

    </div>
  );
}

export default App;
