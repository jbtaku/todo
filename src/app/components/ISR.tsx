"use client";

import { useISR } from "@/actions/useUserInfo";
import React from "react";

function ISR() {
  const onClick = () => {
    useISR();
  };
  return <button onClick={onClick}>ISR</button>;
}

export default ISR;
