"use client";

import SignInDialog from "../custom-ui/SignInDialog";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";
import { VscAccount } from "react-icons/vsc";

function Header() {
  const { userInfo, isPending } = useUserInfo();

  return (
    <header className="flex">
      <h1 className="text-6xl font-bold">Todo</h1>
      {isPending ? (
        <Skeleton className="ml-auto w-12 h-12 rounded-full bg-gradient-to-r from-slate-200 to-slate-300/80" />
      ) : (
        <div className="flex items-center ml-auto">
          {userInfo ? (
            <div className="flex space-x-4 items-center">
              {userInfo.image ? (
                <Image
                  src={userInfo.image}
                  width={40}
                  height={40}
                  alt="プロフィール画像"
                  className="w-12 circle"
                />
              ) : (
                <VscAccount className="" size={"40"} />
              )}
            </div>
          ) : (
            <SignInDialog />
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
