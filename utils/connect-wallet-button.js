import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { lightTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

export default function ConnectWallet() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      connectButton={{
        label: "Connect Wallet",
      }}
      theme={lightTheme({
        colors: {
          primaryButtonBg: "#c9f364",
          primaryButtonText: "#000000",
        },
      })}
      connectModal={{ size: "compact" }}
      style={{
        width:'120px',
        height:'50px',
        fontSize:'20px'
      }}
    />
  );
}
