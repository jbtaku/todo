"use client";

import { testISR } from "@/actions/useUserInfo";
import React from "react";

function ISR() {
  const onClick = async () => {
    await testISR();
  };
  return <button onClick={onClick}>ISR</button>;
}

export default ISR;
