import CreatableSelect from "react-select/creatable";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogDelete from "./Modals/DialogDelete";
import CustomAxios from "../axios/customAxios";
import { AppContext } from "../App";
import Loader from "./Constants/Louder";

const Hotel = () => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  const customAxios = CustomAxios();
  const { userData, setUserData } = useContext(AppContext);
  const [isLoad, setIsLoad] = useState(true);

  // Hotels
  const [hotels, setHotels] = useState([]);

  const [hotelData, setHotelData] = useState({
    isEdit: false,
    id: "",
    name: "",
    location: "",
    city: "",
  });

  useEffect(() => {
    if (userData.isAuth) {
      if (hotels.length == 0) {
        getAllHotels();
      }
    }
  }, [userData]);

  const getAllHotels = async () => {
    try {
      const response = await customAxios({
        method: "get",
        url: "hotel",
      });
      setHotels(response.data);
      setIsLoad(false);
    } catch (err) {
      alert(err.response.data.message);
      setIsLoad(false);
    }
  };

  // Add new hotel data
  const addHotelHandler = async (e) => {
    e.preventDefault();
    try {
      await customAxios({
        method: "post",
        url: "hotel",
        data: await JSON.stringify({
          name: hotelData.name,
          location: hotelData.location,
          city: hotelData.city,
        }),
      });
      getAllHotels();
      setHotelData({
        id: "",
        name: "",
        location: "",
        city: "",
      });
      setShowModal(false);
      toast.success("Ийгиликтүү сакталды!!!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  // // Delete
  const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
  const [delHotelId, setDelHotelId] = useState(null);

  const areYouSureDelete = async (choose) => {
    if (choose) {
      await customAxios({
        method: "delete",
        url: `hotel/${delHotelId}`,
      })
        .then((res) => {
          getAllHotels();
          setIsShowDialogModalWin(false);
          toast.error("Ийгиликтүү өчүрүлдү!!!", {
            position: "top-right",
            autoClose: 3000, // 3 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            style: {
              backgroundColor: "#fff", // Set your desired background color
            },
          });
          setDelHotelId(null);
        })
        .catch((rej) => {
          alert(rej.message);
        });
    } else {
      setIsShowDialogModalWin(false);
      setDelHotelId(null);
    }
  };

  // Edit hotel data
  const editFormInitializationHandler = (data) => {
    setHotelData({
      isEdit: true,
      ...data,
    });
  };
  const editHotelDataHandler = async (e) => {
    e.preventDefault();

    let data = JSON.stringify({
      name: hotelData.name,
      location: hotelData.location,
      city: hotelData.city,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `hotel/${hotelData.id}`,
      data: data,
    };

    await customAxios
      .request(config)
      .then((response) => {
        setHotelData({
          id: "",
          name: "",
          location: "",
          city: "",
        });
        setShowModal(false);
        toast.success("Ийгиликтүү сакталды!!!", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getAllHotels();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="bg-white p-4">
      <ToastContainer />
      <div className="flex justify-end border-b pb-4 border-gray-200">
        <button
          className="flex items-center text-lg rounded-lg border p-1 bg-green-400"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoMdAdd />
          Жаңы кошуу
        </button>
        <Modal
          isVisible={showModal}
          onClose={() => {
            setShowModal(false);
            setHotelData({
              isEdit: false,
              id: "",
              name: "",
              location: "",
              city: "",
            });
          }}
        >
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Мейманканалар
            </h3>
            <form
              className="space-y-3"
              action="#"
              onSubmit={
                hotelData.isEdit ? editHotelDataHandler : addHotelHandler
              }
            >
              <div>
                <label
                  htmlFor="name"
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
                  value={hotelData.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) => {
                    setHotelData(
                      hotelData.isEdit
                        ? { ...hotelData, name: e.currentTarget.value }
                        : {
                            ...hotelData,
                            id: e.currentTarget.value,
                            name: e.currentTarget.value,
                          }
                    );
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Карта адреси
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="42.161384638583456, 74.27452891557907"
                  required
                  defaultValue={hotelData.location}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) => {
                    setHotelData({
                      ...hotelData,
                      location: e.currentTarget.value,
                    });
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Шаар
                </label>
                <select
                  onChange={(e) => {
                    setHotelData({ ...hotelData, city: e.currentTarget.value });
                  }}
                  className="w-9/12 p-2.5 rounded-lg cursor-pointer bg-gray-50 border-gray-300 border text-gray-900 text-sm"
                >
                  <option value={hotelData.isEdit ? hotelData.city : ""}>
                    {hotelData.isEdit ? hotelData.city : "Choose city"}
                  </option>
                  <option value="MAKKAH">MAKKAH</option>
                  <option value="MADINAH">MADINAH</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-100 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {hotelData.isEdit ? "Өзгөртүү" : "Сактоо"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="flex flex-col pt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full h-full sm:px-6 lg:px-8">
            <div className="shadow border-b overflow-y-scroll border-gray-200 sm:rounded-lg">
              {isLoad ? (
                <Loader />
              ) : hotels.length == 0 ? (
                <div className="w-full flex p-5 justify-center items-center">
                  <span>Мейманканалар жок</span>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        №
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
                        Latitude
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Logitude
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        City
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {hotels.map((hotel, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-200 duration-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        </td>
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
                                {hotel.latitude}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {hotel.longitude}
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
                          <button
                            onClick={() => {
                              editFormInitializationHandler({
                                id: hotel.id,
                                name: hotel.name,
                                location:
                                  hotel.latitude + ", " + hotel.longitude,
                                city: hotel.city,
                              });
                              setShowModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <CiEdit />
                          </button>
                          <button
                            onClick={() => {
                              setIsShowDialogModalWin(true);
                              setDelHotelId(hotel.id);
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <RiDeleteBin5Line />
                          </button>
                          {isShowDialogModalWin && (
                            <DialogDelete
                              onDialog={areYouSureDelete}
                              message={"Чындап өчүрүүнү каалайсызбы?"}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
