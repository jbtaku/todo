"use client";

import { todo2ISR, todoISR } from "@/actions/useISR";
import React from "react";

function ISR() {
  const onClick = async () => {
    await todoISR();
  };
  const onClick2 = async () => {
    await todo2ISR();
  };
  return (
    <div className="grid">
      <button onClick={onClick}>ISR</button>
      <button onClick={onClick2}>ISR2</button>
    </div>
  );
}

export default ISR;
