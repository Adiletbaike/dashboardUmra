import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogDelete from "./Modals/DialogDelete";
import { AppContext } from "../App";
import CustomAxios from "../axios/customAxios";
import Loader from "./Constants/Louder";

const languagesData = [
  { code: "RU", lang: "Русский язык" },
  { code: "KG", lang: "Кыргыз тили" },
  { code: "KZ", lang: "Казак тили" },
  { code: "UZ", lang: "Uzbek тили" },
  { code: "TR", lang: "Turkce" },
  { code: "EN", lang: "English" },
];

const guideInitialData = {
  isEdit: false,
  data: {
    id: "",
    name: "",
    surname: "",
    phone: "",
    education: "",
    languages: [],
  },
}

const Guide = () => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [guides, setGuides] = useState([]);
  const { userData, setUserData } = useContext(AppContext);
  const customAxios = CustomAxios();
  const [isLoad, setIsLoad] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);

  const [guideData, setGuideData] = useState({...guideInitialData});

  useEffect(() => {
    if (userData.isAuth) {
      if (guides.length == 0) {
        getAllGuides();
      }
    }
  }, [userData]);

  const getAllGuides = async () => {
    try {
      const response = await customAxios({
        method: "get",
        url: "lead-group",
      });
      setGuides(response.data);
      setIsLoad(false);
    } catch (err) {
      console.log(err);
      setIsLoad(false);
    }
  };

  // add new guide
  const addGuideHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await JSON.stringify({
        firstName: guideData.data.name,
        lastName: guideData.data.surname,
        phoneNumber: guideData.data.phone,
        university: guideData.data.education,
        languages: guideData.data.languages,
      });
      await customAxios({
        method: "post",
        url: "lead-group",
        data: data,
      });
      getAllGuides();
      setGuideData({...guideInitialData});
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
      alert(err.message);
    }
  };

  // Delete
  const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
  const [delGuideId, setDelGuideId] = useState(0);

  const areYouSureDelete = async (choose) => {
    if (choose) {
      await customAxios({
        method: "delete",
        url: `lead-group/${delGuideId}`,
      });
      getAllGuides();
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
      setDelGuideId(0);
      setIsShowDialogModalWin(false);
    } else {
      setIsShowDialogModalWin(false);
    }
  };

  // Edit guide data
  const handleEditValues = async (e) => {
    e.preventDefault();
    try {
      const data = await JSON.stringify({
        firstName: guideData.data.name,
        lastName: guideData.data.surname,
        phoneNumber: guideData.data.phone,
        university: guideData.data.education,
        languages: guideData.data.languages,
      });
      await customAxios({
        method: "put",
        url: `lead-group/${guideData.data.id}`,
        data: data,
      });
      getAllGuides();
      setGuideData({...guideInitialData});
      setShowModal(false);
      toast.info("Ийгиликтүү өзгөртүлдү!!!", {
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
    } catch (err) {
      alert(err.message);
    }
  };

  const addLanguageHandler = (lang) => {
    if (!guideData.data.languages.includes(lang)) {
      setGuideData((prev) => {
        return {
          ...prev,
          data: { ...prev.data, languages: [...prev.data.languages, lang] },
        };
      });
    } else {
      setGuideData((prev) => {
        return {
          ...prev,
          data: {
            ...prev.data,
            languages: prev.data.languages.filter((item) => item != lang),
          },
        };
      });
    }
  };

  return (
    <div className="bg-white p-4 overflow-x-scroll">
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
            setShowModal(false)
            setGuideData({...guideInitialData})
          }}>
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Умра башчы
            </h3>
            <form
              className="space-y-3"
              action="#"
              onSubmit={guideData.isEdit ? handleEditValues : addGuideHandler}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Аты
                </label>
                <input
                  value={guideData.data.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Аты"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) =>
                    setGuideData((prev) => {
                      return guideData.isEdit
                        ? {
                            ...prev,
                            data: { ...prev.data, name: e.target.value },
                          }
                        : {
                            ...prev,
                            data: {
                              ...prev.data,
                              id: e.target.value,
                              name: e.target.value,
                            },
                          };
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Фамилия
                </label>
                <input
                  type="text"
                  value={guideData.data.surname}
                  name="surname"
                  id="surname"
                  placeholder="Фамилиясы"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) =>
                    setGuideData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, surname: e.target.value },
                      };
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="surname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  value={guideData.data.phone}
                  name="number"
                  id="number"
                  placeholder="Телефон номери"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) =>
                    setGuideData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, phone: e.target.value },
                      };
                    })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="education"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Билими
                </label>
                <input
                  type="text"
                  value={guideData.data.education}
                  name="education"
                  id="education"
                  placeholder="Билими"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) =>
                    setGuideData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, education: e.target.value },
                      };
                    })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="education"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Билген тилдери
                </label>
                <div className="w-9/12 relative text-gray-900 text-sm">
                  <label
                    className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-2 cursor-pointer"
                    onClick={() => {
                      setShowLanguages((prev) => !prev);
                    }}
                  >
                    {guideData.data.languages.length == 0
                      ? "Select language"
                      : guideData.data.languages.join(", ")}
                  </label>
                  {showLanguages ? (
                    <div className="w-full py-1 border border-gray-300 rounded-lg absolute z-1 bg-white start-0 top-full">
                      {languagesData.map((item, index) => {
                        return (
                          <div
                            className="w-full px-2 py-1 cursor-pointer hover:bg-gray-100 flex gap-1"
                            key={index}
                            onClick={(e) => {
                              addLanguageHandler(item.code);
                              setShowLanguages(false);
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={guideData.data.languages.includes(
                                item.code
                              )}
                              className="cursor-pointer"
                            />
                            <p>{item.lang} </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-100 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {guideData.isEdit ? "Өзгөртүү" : "Сактоо"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="flex flex-col pt-4">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {isLoad ? (
                <Loader />
              ) : guides.length == 0 ? (
                <div className="flex w-full justify-center items-center p-5">
                  <span> Группа башчылары жок </span>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
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
                      <th
                        scope="col"
                        className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guides.map((person, index) => (
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
                                {person.firstName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {person.lastName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {person.phoneNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.university}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {person.languages
                            ? person.languages.join(", ")
                            : "No lang"}
                        </td>
                        <td className=" flex px-6 py-6 whitespace-nowrap gap-2 border-none text-right text-2xl items-center font-medium">
                          <button
                            onClick={() => {
                              setGuideData({
                                isEdit: true,
                                data: {
                                  id: person.id,
                                  name: person.firstName,
                                  surname: person.lastName,
                                  phone: person.phoneNumber,
                                  education: person.university,
                                  languages: person.languages
                                    ? person.languages
                                    : [],
                                },
                              });
                              setShowModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <CiEdit />
                          </button>
                          <button
                            onClick={() => {
                              setDelGuideId(person.id);
                              setIsShowDialogModalWin(true);
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

export default Guide;
