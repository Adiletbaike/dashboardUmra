import React from "react";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";

const Groups = () => {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between border-b pb-4 border-gray-200">
        <strong className="text-2xl">Groups</strong>
        <div className="relative">
          <HiOutlineSearch
            fontSize={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Search..."
            className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-400 rounded-md pl-11 pr-4"
          />
        </div>
        <button className="flex items-center text-lg rounded-lg border p-1 bg-green-400">
          <IoMdAdd />
          Add New
        </button>
      </div>
    </div>
  );
};

export default Groups;
