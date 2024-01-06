"use client";

import { revalidatePath } from "next/cache";
import React from "react";

function ISR() {
  const onClick = () => {
    revalidatePath("/api/todo");
  };
  return <button onClick={onClick}>ISR</button>;
}

export default ISR;
