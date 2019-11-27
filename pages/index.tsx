import React from "react";
import dynamic from "next/dynamic";
import "../src/style.css";

const Scene = dynamic(
  () => import("../src/components/Scene").then(mod => mod.Scene),
  { ssr: false }
);

const Index = () => {
  return (
    <div className="max-w-4xl min-h-screen py-16 mx-auto flex flex-col">
      <div className="bg-gray-100 rounded-lg shadow-lg flex-1">
        <Scene />
      </div>
    </div>
  );
};

export default Index;
