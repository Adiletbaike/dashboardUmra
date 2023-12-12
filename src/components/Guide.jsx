import React, { useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import Select from "react-select";

const people = [
  {
    name: "Abdulla Kaary",
    surname : "Abdullaev",
    phone: "+996708112288",
    university: "Islam University",
    image: "https://bit.ly/33HnjK0",
  },
  {
    name: "Aibek Ustaz",
    surname : "Aibekov",
    phone: "+996708112288",
    university: "Egypt, Al-Askar",
    image: "https://bit.ly/3I9nL2D",
  },
  {
    name: "Nurbek Kaary",
    surname : "Nurbekov",
    phone: "+996708112288",
    university: "Manas University",
    image: "https://bit.ly/3vaOTe1",
  },
];
const language = [
  { value: "kyrgyz", label: "Кыргыз" },
  { value: "russia", label: "Орус" },
  { value: "kazakh", label: "Казак" },
];

const Guide = () => {
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(event.target.files[0]);
  };
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
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Умра башчы
            </h3>
            <form className="space-y-3" action="#">
              <div
                className="flex flex-col justify-center"
                onClick={handleImageClick}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="w-20 mb-2 rounded-full"
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt=""
                    className="w-20 mb-2"
                  />
                )}
                <input
                  type="file"
                  // className="w-full"
                  ref={inputRef}
                  onChange={handleImageChange}
                  // style={{display: none}}
                />
              </div>
              <div>
                <label
                  for="name"
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
                  for="surname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Фамилия
                </label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Фамилиясы"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  for="surname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Телефон
                </label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  placeholder="Телефон номери"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  for="education"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Билими
                </label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  placeholder="Билими"
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
                <Select
                  defaultValue={[language[0], language[3]]}
                  isMulti
                  name="language"
                  options={language}
                  className="basic-multi-select"
                  classNamePrefix="select"
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Сүрөт
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
                      Фамилиясы
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Телефон
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Билими
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Билген тилдери
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email} className="hover:bg-gray-200 duration-300">
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
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {person.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {person.surname}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {person.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.university}
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

export default Guide;
