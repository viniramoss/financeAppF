import { Wallet, Minus } from "lucide-react";
export function MainPage() {

  return (
    <div className="bg-zinc-400 w-screen px-8 py-2 mx-auto flex justify-between items-center">
        <Wallet className="" />

        <span className="flex flex-col">
        <Minus className="relative top-1.5" />
        <Minus className="relative bottom-1.5" />
        </span>
    </div>
  );
}
