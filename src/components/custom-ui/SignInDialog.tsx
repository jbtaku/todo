"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { FcGoogle } from "react-icons/fc";
import { ClassName } from "@/types/common";

interface Props extends ClassName {
  variant?: any;
}

function SignInDialog({ variant, className }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          サインイン
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[94%] rounded-md xs:max-w-md">
        <DialogHeader>
          <DialogTitle>サインイン</DialogTitle>
        </DialogHeader>
        <div className="grid place-items-center mt-4">
          <SignInButton provider="Google" icon={<FcGoogle size="24" />} />
        </div>
        <DialogFooter>サインインしましょう。</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
