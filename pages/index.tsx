import React from "react";
import dynamic from "next/dynamic";
import "../src/style.css";

const Scene = dynamic(
  () => import("../src/components/Scene").then(mod => mod.Scene),
  { ssr: false }
);

const Index = () => {
  return (
    <div className="h-screen w-screen">
      <Scene />
    </div>
  );
};

export default Index;
