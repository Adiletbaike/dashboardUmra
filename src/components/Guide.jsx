import React from "react";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line  } from "react-icons/ri";

const people = [
  {
    name: "Abdulla Kaary",
    title: "Islam University",
    department: "Din taanuu",
    role: "Guide",
    email: "abdulla@example.com",
    image: "https://bit.ly/33HnjK0",
  },
  {
    name: "Aibek Ustaz",
    title: "Egypt, Al-Askar",
    department: "Islam taanuu",
    role: "Guide",
    email: "aibek@example.com",
    image: "https://bit.ly/3I9nL2D",
  },
  {
    name: "Nurbek Kaary",
    title: "Manas University",
    department: "Din taanuu",
    role: "Guide",
    email: "nurbek@example.com",
    image: "https://bit.ly/3vaOTe1",
  },
  // More people...
];

const Guide = () => {
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between border-b pb-4 border-gray-200">
        <strong className="text-2xl">Guides</strong>
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
      <div className="flex flex-col pt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Education
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Language
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              width="48"
                              height="48"
                              className="rounded-full"
                              src="https://img.icons8.com/emoji/48/000000/man-wearing-turban.png"
                              alt="man-wearing-turban"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          KG
                        </span>
                        <span
                          className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          En
                        </span>
                        <span
                          className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                        >
                          Ru
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className=" flex px-6 py-6 whitespace-nowrap gap-2 border-none text-right text-2xl items-center font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <CiEdit/>
                        </a>
                        <a
                          href="#"
                          className="text-red-600 hover:text-red-900"
                        >
                          <RiDeleteBin5Line />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
