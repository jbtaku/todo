"use client";

import { useQState } from "@/hooks/useQState";
import Link from "next/link";
import React from "react";

function Page() {
  const [count, setCount] = useQState(["count"], 1);
  const onClick = () => {
    setCount((prevState) => prevState + 1);
  };
  return (
    <div>
      <div>
        <p>{count}</p>
        <button onClick={onClick}>up count</button>
      </div>
      <Link href={"/"}>go to top</Link>
    </div>
  );
}

export default Page;
