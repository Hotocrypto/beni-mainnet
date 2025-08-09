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
      className={`${mouldyCheese.variable} microdot-bg-blue`}
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="pawprint-overlay" />
      <div 
        className="flex sm:items-center sm:justify-center min-h-screen w-full font-[family-name:var(--font-mouldy-cheese)] sm:overflow-hidden overflow-y-auto px-4 sm:px-0"
        style={{ position: "relative", zIndex: 10 }}
      >
        <h1 className="text-5xl">
          <NFTMintingPage/>
        </h1>
      </div>
    </div>
  );
}