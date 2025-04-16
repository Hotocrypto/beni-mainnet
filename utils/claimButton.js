import React from 'react';
import { ClaimButton } from "thirdweb/react";
import { baseSepolia, base } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { lightTheme } from "thirdweb/react";

export default function MintButton({ quantity, onTransactionConfirmed }) {
  console.log('quantity', quantity);

  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  });

  return (
    <ClaimButton
      contractAddress={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
      chain={base}
      client={client}
      claimParams={{
        type: "ERC721",
        quantity: BigInt(quantity), // Use the passed quantity, converted to bigint
      }}
      theme={lightTheme({
        colors: {
          primaryButtonBg: "#c9f364",
          primaryButtonText: "#000000",
        },
      })}
      onTransactionConfirmed={(receipt) => {
        console.log("Transaction confirmed", receipt.transactionHash);
        if (onTransactionConfirmed) {
          onTransactionConfirmed(receipt.transactionHash);
        }
      }}
      style={{
        width: '130px',
        height: '50px',
        fontSize: '20px',
      }}
    >
      Mint Now
    </ClaimButton>
  );
}