import React from "react";

export const TodoLoader = () => {
  return (
    <div className="group flex flex-row items-center justify-between bg-green-100 p-3 rounded-md m-2 h-[48px] animate-pulse">
      <p className="hidden">Add todo</p>
      <div className="hidden group-hover:flex"></div>
    </div>
  );
};
