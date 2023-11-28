import CreatableSelect from "react-select/creatable";
import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import Modal from "./Modals/Modal";

const hotel = [
  { value: "mekkah", label: "Мекке" },
  { value: "medina", label: "Мадина" },
];

const Hotel = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-white p-4">
      <div className="flex justify-between border-b pb-4 border-gray-200">
        <div className="relative">
          <HiOutlineSearch
            fontSize={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-3"
          />
          <input
            type="text"
            placeholder="Издөө..."
            className="text-sm focus:outline-none active:outline-none h-10 w-[24rem] border border-gray-400 rounded-md pl-11 pr-4"
          />
        </div>
        <button
          className="flex items-center text-lg rounded-lg border p-1 bg-green-400"
          onClick={() => setShowModal(true)}
        >
          <IoMdAdd />
          Жаңы кошуу
        </button>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Мейманканалар
            </h3>
            <form className="space-y-3" action="#">
              <div>
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Мейманкана аты
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
                  for="surname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Карта адреси
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Адрес"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  for="education"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Билген тилдери
                </label>
                <CreatableSelect isClearable options={hotel} />
              </div>
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
    </div>
  );
};

export default Hotel;
