"use client";
import Image from "next/image";
import abiContract from "@/public/abi.json";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { ethers, utils } from "ethers";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState();
  const GetContract = async () => {
    try {
      if (window.ethereum) {
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          "0xb7640e17d26dbc0b058197b4e139b41780877847",
          abiContract,
          provider
        );

        const getName = await contract.myDemoName();

        const getName2 = await contract.mySecondDemoName();
        setName(getName + "======>" + getName2);
        console.log(getName.toString());
        return contract;
      } else {
        console.error("MetaMask not detected");
      }
    } catch (error) {
      loadGetInitialProps(error, "Error at Deployed contract Function");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      hello world {name}
      <div>
        <button onClick={GetContract}>Get Contract</button>
      </div>
    </main>
  );
}
