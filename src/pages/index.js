import Image from "next/image";
import localFont from "next/font/local";
import NFTMintingPage from "@/components/mint";

const mouldyCheese = localFont({
  src: "./fonts/MouldyCheeseRegular.ttf",
  variable: "--font-mouldy-cheese",
});

export default function Home() {
  return (
    <div
      className={`${mouldyCheese.variable} flex  sm:items-center sm:justify-center h-screen w-screen font-[family-name:var(--font-mouldy-cheese)] bg-custom-bg
        bg-cover bg-center bg-no-repeat sm:overflow-hidden overflow-y-auto`}
    >
      <h1 className="text-5xl">
        <NFTMintingPage/>
      </h1>
    </div>
  );
}