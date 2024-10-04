import React, { useState } from 'react';
import { useSendTransaction, useActiveAccount } from "thirdweb/react";
import { claimTo } from "thirdweb/extensions/erc721";
import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Create the client with your clientId
const client = createThirdwebClient({
  clientId: "6315970ae445c5d61624d51c805ae18f"
});

// Connect to your contract
const contract = getContract({
  client,
  chain: defineChain(84532),
  address: "0xd46b3a9EC7547d9110f762044142614c3E69B254"
});

import { useReadContract } from "thirdweb/react";

export default function getTotalMinted() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function totalMinted() view returns (uint256)",
    params: []
  });

  console.log(data);
  return data;
}