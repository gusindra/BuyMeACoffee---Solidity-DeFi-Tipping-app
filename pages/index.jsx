import abi from '../utils/BuyMeACoffee.json';
import { ethers } from "ethers";
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'
import Hero from '../components/Hero'

export default function Home() {
  // Contract Address & ABI
  const contractAddress = "0xD481Fafd7D7Dec7a340c716d152d8133D931611a";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);
  const [coffee, setCoffee] = useState(0);

  const onCoffeeChange = (event) => {
    setCoffee(event.currentTarget.value);
  }
  
  const onNameChange = (event) => {
    setName(event.target.value);
  }

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  }

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({method: 'eth_accounts'})
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  const connectWallet = async () => {
    try {
      const {ethereum} = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const buyCoffee = async () => {
    try {
      const {ethereum} = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..")
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          {value: ethers.utils.parseEther(coffee>=1? "" +coffee*1/1000 : "0.001")}
        );

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("coffee purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        
        console.log("fetching memos from the blockchain..");
        const memos = await buyMeACoffee.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name
        }
      ]);
    };

    const {ethereum} = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    }
  }, []);
  
  return (
    <div>
      <Head>
        <title>Buy Gusin a Coffee!</title>
        <meta name="description" content="Tipping site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="h-screen">
        <div>
          <div className="flex bg-white rounded-sm shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-full h-screen">  
            <div className="hidden lg:block lg:w-1/2 bg-cover custom-img" />
            <div className="w-full p-8 lg:w-1/2 flex items-center justify-center">
              <div className="">
                <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">Buy Me Coffee</h2>
                <p className="text-base text-gray-600 text-center">Hi, I'm Gusindra let's playing using Goerli Token.<br></br> <a className="text-blue-600" href="https://goerlifaucet.com/" target="_blank">Click here</a> to get free token.</p>
            
                {currentAccount ? (
                  <div>
                    <form>
                      
                      <div className="mt-4">
                         <input type="radio" id="null" name="coffee" value="0" className="hidden" />
                        <label className="block text-gray-700 text-sm font-bold mb-2">Coffee</label>        
                      <ul className="flex gap-4">
                          <li>
                              <input type="radio" id="small" name="coffee" value="1" className="hidden peer" onChange={onCoffeeChange} checked={coffee == 1} />
                              <label htmlFor="small" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-gray-200 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:bg-blue-100 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-200 dark:hover:bg-gray-700" >                           
                                  <div className="block">
                                      <div className="w-full text-lg font-semibold">Small Coffee</div>
                                      <div className="w-full">for 0.001GOR</div>
                                  </div>
                              </label>
                          </li>
                          <li>
                              <input type="radio" id="medium" name="coffee" value="3" className="hidden peer" onChange={onCoffeeChange} checked={coffee == 3} />
                              <label htmlFor="medium" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-gray-200 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:bg-blue-100 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="block">
                                      <div className="w-full text-lg font-semibold">Medium Coffee</div>
                                      <div className="w-full">for 0.003GOR</div>
                                  </div>
                              </label>
                          </li>
                          <li>
                              <input type="radio" id="large" name="coffee" value="5" className="hidden peer" onChange={onCoffeeChange} checked={coffee == 5} />
                              <label htmlFor="large" className="inline-flex justify-between items-center p-5 w-full text-gray-500 bg-gray-200 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 peer-checked:bg-blue-100 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="block">
                                      <div className="w-full text-lg font-semibold">Large Coffee</div>
                                      <div className="w-full">for 0.005GOR</div>
                                  </div>
                              </label>
                          </li>
                      </ul>
                      </div>
                    
                      <div className="mt-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                          <input id="name" className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required onChange={onNameChange} />
                      </div>
                      
                      <div className="mt-4">
                          <div className="flex justify-between">
                              <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                          </div>
                          <textarea className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" id="message" type="text" onChange={onMessageChange} required ></textarea>
                      </div>
                    
                      <div className="mt-8">
                          <button onClick={buyCoffee} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Support {coffee?(<div>{coffee*1/1000}GOR</div> ):(1)}</button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <a href="#" onClick={connectWallet} className="flex items-center justify-center mt-4 rounded-lg shadow-md hover:bg-gray-100 bg-blue-400 ">
                          <h1 className="px-4 py-3 w-5/6 text-center text-gray-200 hover:text-gray-600 font-bold">Connect to Wallet</h1>
                      </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {currentAccount && (<h1> </h1>)}

      <div className="flex flex-wrap">
      {currentAccount && (memos.map((memo, idx) => {
        return (
          <div key={idx} >
            <div className="ball1">
              <div className="text mt-5">
                <br></br>
                <p>"{memo.message}"</p>
                <p className="text-xs mt-5">- {memo.name} <span className="hidden">at {memo.timestamp.toString()}</span></p>
              </div>
            </div>
          </div>
        )
      }))}
      </div>


      <footer className="text-center px-auto py-10">
          <div>
            Created by 
            <a className="font-bold" target="_blank" href="https://gusindra.jstore.co"> Gusin </a> use Next JS & 
            <a className="font-bold" href="https://alchemy.com/?a=roadtoweb3weektwo" target="_blank" rel="noopener noreferrer"
        > Alchemy's</a>. 1st Lesson Road to Web3.
          </div>
      </footer>
    </div>
  )
}
