import React from "react";
import {
  HiOutlineUserGroup,
  HiOutlineUserPlus,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

const BoxWrapper = ({ children }) => {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
};
const Dashboard = () => {
  return (
    <div className="flex gap-4 w-full">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <HiOutlineUserGroup className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-900 font-light">Total Groups</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">100</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-500">
          <HiOutlineUserPlus className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-900 font-light">Total Guides</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">100</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <HiOutlineBuildingOffice2 className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-900 font-light">Total Hotels</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">100</strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default Dashboard;
