import CreatableSelect from "react-select/creatable";
import React, { useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";

const hotel = [
  { value: "mekkah", label: "Мекке" },
  { value: "medina", label: "Мадина" },
];

const hotels = [
  {
    name: "Durrat al Eiman",
    mapLink: "https://maps.app.goo.gl/eK91rkjNa9rRkHU78",
    city: "Мадина",
  },
  {
    name: "Movenpick",
    mapLink: "https://maps.app.goo.gl/WHnUNw4xTz8hhyWB6",
    city: "Мекке",
  },
  {
    name: "Emaar Royal",
    mapLink: "https://maps.app.goo.gl/D8fnVkwcR7v3wFKr6",
    city: "Мадина",
  },
];

const Hotel = () => {
  const nameRef = useRef();
  const mapLinkRef = useRef();
  const cityRef = useRef();
  // Table
  const [data, setData] = useState(hotels);
  const [selectedCity, setSelectedCity] = useState(null);

  //handle values
  const handleValues = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const mapLink = mapLinkRef.current.value;
    const city = selectedCity ? selectedCity.label : '';
    var newHotel = {
      name,
      mapLink,
      city,
    };
    console.log(newHotel);
    setData((prevData) => prevData.concat(newHotel));
    nameRef.current.value = "";
    mapLinkRef.current.value = "";
    setSelectedCity(null);
  };

  // Modal
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="bg-white p-4">
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
              Мейманканалар
            </h3>
            <form className="space-y-3" action="#" onSubmit={handleValues}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Мейманкана аты
                </label>
                <input
                  ref={nameRef}
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
                  htmlFor="mapLink"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Карта адреси
                </label>
                <input
                  ref={mapLinkRef}
                  type="text"
                  name="mapLink"
                  id="mapLink"
                  placeholder="Адрес"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Жайгашкан жери
                </label>
                <CreatableSelect
                  ref={cityRef}
                  onChange={(selectedOption) => setSelectedCity(selectedOption)}
                  isClearable
                  options={hotel}
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
          <div className="py-2 align-middle inline-block min-w-full h-full sm:px-6 lg:px-8">
            <div className="shadow border-b h-[500px] overflow-y-scroll border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <tr>
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
                      Карта адрес
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Шаар
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {data.map((hotel) => (
                    <tr
                      key={hotel.mapLink}
                      className="hover:bg-gray-200 duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {hotel.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              <a href={hotel.mapLink} target="_blank">
                                {hotel.mapLink}
                              </a>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {hotel.city}
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

export default Hotel;
