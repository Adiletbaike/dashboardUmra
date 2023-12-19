import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import CreatableSelect from "react-select/creatable";

const gender = [
  { value: "male", label: "Эркек" },
  { value: "female", label: "Аял" },
];

const members = [
  {
    id: 1,
    name: "Адилет",
    surname: "Джураев",
    phone: "+996703863539",
    birthday: "06.06.2000",
    inn: "12345678912345",
    gender: "Эркек",
    login: "adilet",
    password: "baike",
  },
  {
    id: 2,
    name: "Нурбек",
    surname: "Нурбеков",
    phone: "+996774742422",
    birthday: "10.03.1997",
    inn: "12345678912345",
    gender: "Эркек",
    login: "nurbek",
    password: "admin",
  },
  {
    id: 3,
    name: "Айгул",
    surname: "Нурбеков",
    phone: "+996778142535",
    birthday: "14.08.1980",
    inn: "12345678912345",
    gender: "Аял",
    login: "aigul",
    password: "1234",
  },
];
const MembersGroup = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-white p-4 overflow-x-scroll">
      <div className="flex justify-end border-b pb-4 border-gray-200">
        
        <button
          className="flex items-center text-lg rounded-lg border p-1 bg-green-400"
          onClick={() => setShowModal(true)}
        >
          <IoMdAdd />
          Жаңы кошуу
        </button>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 px-6 lg:px-8 text-left mt-24">
            <h3 className="mb-1 text-xl font-medium text-gray-900">Мүчөлөр</h3>
            <form className="space-y-2" action="#">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Аты
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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Фамилия
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Фамилия"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Телефон
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  placeholder="Телефон"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Туулган күнү
                </label>
                <input
                  type="date"
                  name="number"
                  id="number"
                  placeholder="Телефон"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="number"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  ИНН
                </label>
                <input
                  type="number"
                  name="number"
                  id="number"
                  placeholder="00000000000000"
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
                    Жыныс
                  </label>
                  <CreatableSelect isClearable options={gender} />
                </div>
              </div>
              <div>
                <label
                  htmlFor="login"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Логин
                </label>
                <input
                  type="text"
                  name="login"
                  id="login"
                  placeholder="Логин"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Пароль
                </label>
                <input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Пароль"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
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
      <div className="flex flex-col pt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Аты
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Фамилия
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Телефон
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Туулган күнү
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ИНН
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Жыныс
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Логин
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Пароль
                    </th>
                    <th scope="col" className="relative px-5 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr
                      key={member.id}
                      className="hover:bg-gray-200 duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {member.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.surname}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.birthday}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {member.inn}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.login}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.password}
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

export default MembersGroup;
