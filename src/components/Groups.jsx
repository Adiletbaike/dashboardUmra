import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import CreatableSelect from "react-select/creatable";
import ModalCalendar from "./Modals/ModalCalendar";
import Calendar from "./Calendar/Calendar";

const language = [
  { value: "kyrgyz", label: "Кыргыз" },
  { value: "russia", label: "Орус" },
  { value: "kazakh", label: "Казак" },
];

const guide = [
  { value: "abdulla", label: "Абдулла каары" },
  { value: "denis", label: "Денис устаз" },
  { value: "bekbolsun", label: "Бекболсун устаз" },
];

const mekkah = [
  { value: "movenpick", label: "Movenpick" },
  { value: "hilton", label: "Hilton" },
  { value: "jabal", label: "Jabal Omar" },
];

const madina = [
  { value: "durrat", label: "Durrat al Eiman" },
  { value: "ruva", label: "Ruva Al Madinah" },
  { value: "emaar", label: "Emaar Royal" },
];

const groups = [
  {
    id: 1,
    name: "KG1212",
    quantity: 34,
    language: "Кыргыз",
    guide: "Абдулла каары",
    program: "Программа",
  },
  {
    id: 2,
    name: "RU2232",
    quantity: 30,
    language: "Орус",
    guide: "Денис устаз",
    program: "Программа",
  },
  {
    id: 3,
    name: "KG4232",
    quantity: 20,
    language: "Кыргыз",
    guide: "Нурбек каары",
    program: "Программа",
  },
];

const Groups = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalCalendar, setShowModalCalendar] = useState(false);

  return (
    <div className="bg-white p-4">
      <div className="flex justify-end border-b pb-4 border-gray-200">
        
        <button
          className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
          onClick={() => setShowModal(true)}
        >
          <IoMdAdd />
          Жаңы кошуу
        </button>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">Группа</h3>
            <form className="space-y-3" action="#">
              <div>
                <label
                  htmlFor="groups"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Группанын аты
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Аты"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Адам саны
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  placeholder="Саны"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div className="flex justify-between">
                <div className="w-[48%]">
                  <label
                    htmlFor="language"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Группанын тили
                  </label>
                  <CreatableSelect isClearable options={language} />
                </div>
                <div className="w-[50%]">
                  <label
                    htmlFor="guide"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Умра башчы
                  </label>
                  <CreatableSelect isClearable options={guide} />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[48%]">
                  <label
                    htmlFor="hotel"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Мекке отель
                  </label>
                  <CreatableSelect isClearable options={mekkah} />
                </div>
                <div className="w-[50%]">
                  <label
                    htmlFor="hotel"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Мадина отель
                  </label>
                  <CreatableSelect isClearable options={madina} />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModalCalendar(true)}
                className="w-full text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Программаны түзүү
              </button>
              <ModalCalendar
                isVisible={showModalCalendar}
                onClose={() => setShowModalCalendar(false)}
              >
                <div className="w-auto m-10">
                  <Calendar />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="w-100 mt-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Сактоо
                    </button>
                  </div>
                </div>
              </ModalCalendar>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-100 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Сактоо
                </button>
              </div>
            </form>
          </div>
        </Modal>
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
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Аты
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cаны
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Группа тили
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Умра башчы
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Программа
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {groups.map((group) => (
                    <tr
                      key={group.id}
                      className="hover:bg-gray-200 duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {group.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              <a href="/members">{group.name}</a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {group.quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {group.language}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {group.guide}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              <button className="bg-green-300 hover:bg-green-500 duration-500 p-1 rounded-md">
                                {group.program}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className=" flex px-6 py-6 whitespace-nowrap gap-2 border-none text-right text-2xl items-center font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <CiEdit />
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
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

export default Groups;
