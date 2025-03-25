import React, { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import ConnectWallet from "../../utils/connect-wallet-button";
import { useActiveAccount } from "thirdweb/react";
import { Mint } from "../../utils/interact";
import MintButton from "../../utils/claimButton";
import { getTotalClaimedSupply } from "thirdweb/extensions/erc721";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { SiOpensea } from "react-icons/si";

const NFTMintingPage = () => {
  const [mintAmount, setMintAmount] = useState(1);
  const [claimedSupply, setClaimedSupply] = useState(0); // State to store total claimed supply
  const [transactionHash, setTransactionHash] = useState('');
  const [isSoldOut , setIsSoldOut] = useState(false);
  const maxSupply = process.env.NEXT_PUBLIC_TOTAL_SUPPLY;
  const mintPrice = process.env.NEXT_PUBLIC_MINT_COST; // ETH
  const donationPercentage = 0.15;

  const activeAccount = useActiveAccount();
  console.log("address", activeAccount?.address);

  useEffect(() => {
    const fetchTotalClaimedSupply = async () => {
      try {
        const client = createThirdwebClient({
          clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
        });

        const contract = getContract({
          client,
          chain: defineChain(8453),
          address:process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        });

        const totalClaimedSupply = await getTotalClaimedSupply({ contract });
        console.log('claimed amount' , totalClaimedSupply)
        setClaimedSupply(Number(totalClaimedSupply));
        if(claimedSupply == maxSupply) {
          setIsSoldOut(true);
        }
      } catch (error) {
        console.error("Error fetching total claimed supply:", error);
      }
    };

    fetchTotalClaimedSupply();
  }, []);

  const incrementMintAmount = () =>
    setMintAmount((prev) => Math.min(prev + 1, 10));
  const decrementMintAmount = () =>
    setMintAmount((prev) => Math.max(prev - 1, 1));

  const calculateDonation = () => {
    return (claimedSupply * mintPrice * donationPercentage).toFixed(4);
  };

  const handleTransactionConfirmed = (transactionHash) => {
    console.log("Transaction confirmed in parent component:", transactionHash);
    setTransactionHash(transactionHash);
    
  };

  return (
    <div className="flex items-center justify-center mih-h-screen  text-white py-4 sm:py-0">
      <div className="w-full max-w-4xl bg-blue-700 bg-opacity-45 backdrop-filter backdrop-blur-[5px] border-4 border-[#c9f364] rounded-lg shadow-2xl">
        <nav className="hidden sm:flex flex-col sm:flex-row justify-between items-center p-4 bg-[#1769ff] bg-opacity-85 border-b border-white">
          <a
            href="https://benithedog.com"
            className="text-[#c9f364] hover:text-white transition-colors text-xl"
          >
            <img src="/Logo.png" className="h-12 w-auto" />
          </a>
          <div className="text-center tracking-wider">
            <p className="text-sm">
              15% Of Proceeds Will Be Donated To Paws In Need
            </p>
            <p className="text-lg font-bold">
              Donations Raised - {calculateDonation()} ETH
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://x.com/benionbase"
              className="text-[#c9f364] hover:text-white transition-colors"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://t.me/benibasecto"
              className="text-[#c9f364] hover:text-white transition-colors"
            >
              <FaTelegram size={24} />
            </a>
            <a
              href="https://opensea.io/collection/beni-diamond-paw-society"
              className="text-[#c9f364] hover:text-white transition-colors"
            >
              <SiOpensea size={24} />
            </a>
          </div>
        </nav>
{/* mobile nav */}
        <nav className="flex sm:hidden flex-col  justify-between items-center p-4 bg-[#1769ff] bg-opacity-85 border-b border-white">
          <div className='w-full flex justify-center items-center mb-3'>
          <div className="flex space-x-4 items-center">
          <a
            href="https://benithedog.com"
            className="text-[#c9f364] hover:text-white transition-colors text-xl"
          >
            <img src="/Logo.png" className="h-10 w-auto" />
          </a>
            <a
              href="https://x.com/benionbase"
              className="text-[#c9f364] hover:text-white transition-colors"
            >
              <FaXTwitter size={24} />
            </a>
            <a
              href="https://t.me/benibasecto"
              className="text-[#c9f364] hover:text-white transition-colors"
            >
              <FaTelegram size={24} />
            </a>
            <a
              href="https://opensea.io/collection/beni-diamond-paw-society"
              className="text-[#c9f364] hover:text-white transition-colors"
            >
              <SiOpensea size={24} />
            </a>
          </div>
          </div>
          <div className="text-center tracking-wider">
            <p className="text-sm">
              15% Of Proceeds Will Be Donated To Paws In Need
            </p>
            <p className="text-lg font-bold">
            Donations Raised - {calculateDonation()} ETH
            </p>
          </div>
        </nav>


        <div className="p-6 sm:p-10">
          <h1 className="text-2xl sm:text-4xl text-center mb-2">
            Beni Diamond Paw Society
          </h1>
          <h3 className="text-xl sm:text-2xl text-[#c9f364] text-center mb-8">
            {isSoldOut ? 'Sold Out!':'Minting Is Live!'}
          </h3>

          <div className="flex flex-col sm:flex-row gap-8">
            <div className="w-full sm:w-1/2 relative flex items-center justify-center sm:justify-start">
              <div className="absolute top-2 sm:left-2 left-14 bg-black bg-opacity-50 text-white text-sm px-3 py-1 rounded">
                <span className="font-semibold">{claimedSupply}</span> /{" "}
                {maxSupply}
              </div>
              <img
                src="/nfts.gif"
                alt="NFT Preview"
                className="w-[70%] h-auto rounded-lg shadow-lg border border-white"
              />
            </div>

            <div className="w-full sm:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={decrementMintAmount}
                    className="bg-[#c9f364] hover:bg-yellow-300 text-[#1769ff] rounded-full p-2 transition-colors"
                  >
                    <Minus size={24} />
                  </button>
                  <span className="text-4xl font-bold">{mintAmount}</span>
                  <button
                    onClick={incrementMintAmount}
                    className="bg-[#c9f364] hover:bg-yellow-300 text-[#1769ff] rounded-full p-2 transition-colors"
                  >
                    <Plus size={24} />
                  </button>
                </div>

                <div className="border-t border-b border-white py-4">
                  <div className="flex justify-between text-xl text-[#c9f364]">
                    <span>Total</span>
                    <span>{(mintAmount * mintPrice).toFixed(2)} BASE ETH + GAS</span>
                  </div>
                </div>
              </div>

              {activeAccount ? (
                <p className="text-[16px] md:text-[20px] text-white hover:text-[#c9f364] my-4 md:my-0 text-center md:text-start">{transactionHash ? (
                  <a href={`https://base.blockscout.com/tx/${transactionHash}`}>Transaction completed ✅ View on block explorer →</a>
                ) : 'Enjoy Your Mint!'}</p>
              ) : (
                <h1 className="text-[16px] my-4">Connect Wallet To Mint Your NFT!</h1>
              )}
              {/* <button className="w-full flex items-start justify-center bg-gradient-to-r from-[#c9f364] to-yellow-300 text-black tracking-wide c9f364 font-bold py-3 px-6  text-lg hover:from-yellow-300 hover:to-[#c9f364] transition-all duration-200 transform hover:-translate-y-1 shadow-2xl">
                <FaWallet className='w-6 h-6 mr-3'/>
                <p>Connect Wallet to Mint</p>
              </button> */}
              {activeAccount && !isSoldOut ? (
                <div className="flex justify-between items-center  w-full">
                  <ConnectWallet />
                                  <MintButton
                quantity={mintAmount} 
                onTransactionConfirmed={handleTransactionConfirmed}
                />
                </div>
              ) :
              isSoldOut? (
                <button className="w-full opacity-70 cursor-not-allowed flex items-start justify-center bg-gradient-to-r from-[#c9f364] to-yellow-300 text-black tracking-wide c9f364 font-bold py-3 px-6  text-lg hover:from-yellow-300 hover:to-[#c9f364] transition-all duration-200 transform hover:-translate-y-1 shadow-2xl">
                <p>SOLD OUT!</p>
              </button>
              ):
              (
                <ConnectWallet />
              )}
            </div>
          </div>

          <div className="mt-8 text-center text-sm">
            <p>Contract Address</p>
            <a
              href={`https://base.blockscout.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`}
              className="text-[#c9f364] hover:text-yellow-300 break-all"
            >
              {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMintingPage;
