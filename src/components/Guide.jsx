import React, {useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogDelete from "./Modals/DialogDelete";
import CustomAxios from "../axios/customAxios";
import Loader from "./Constants/Louder";

const languagesData = [
  { code: "RU", lang: "Русский язык" },
  { code: "KG", lang: "Кыргызский язык" },
  { code: "KZ", lang: "Казакский язык" },
  { code: "UZ", lang: "Узбекский язык" },
  { code: "TR", lang: "Турецский язык" },
  { code: "EN", lang: "Англиский язык" },
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
  const customAxios = CustomAxios();
  const [isLoad, setIsLoad] = useState(true);
  const [showLanguages, setShowLanguages] = useState(false);

  const [guideData, setGuideData] = useState({...guideInitialData});

  useEffect(() => {
    if (localStorage.getItem('isAuth')=='true') {
      if (guides.length == 0) {
        getAllGuides();
      }
    }
  }, []);

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
      toast.success("Успешно добавлено!!!", {
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
      toast.error("Успешно удалено!!!", {
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
      toast.info("Успешно обновлено!!!", {
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
          Добавить
        </button>
        <Modal 
          isVisible={showModal} 
          onClose={() => {
            setShowModal(false)
            setGuideData({...guideInitialData})
          }}>
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">
              Гид
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
                  Имя
                </label>
                <input
                  value={guideData.data.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Имя"
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
                  placeholder="Фамилия"
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
                  placeholder="Номер телефона"
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
                  Университет
                </label>
                <input
                  type="text"
                  value={guideData.data.education}
                  name="education"
                  id="education"
                  placeholder="Университет"
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
                  Языки
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
                  {guideData.isEdit ? "Обновить" : "Сохранить"}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      <div className="flex flex-col pt-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden overflow-y-scroll border-b border-gray-200 sm:rounded-lg" style={{ maxHeight: '80vh'}}>
              {isLoad ? (
                <Loader />
              ) : guides.length == 0 ? (
                <div className="flex w-full justify-center items-center p-5">
                  <span> Нет гиды </span>
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
                        Имя
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Фамилия
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
                        Университет
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Языки
                      </th>
                      <th
                        scope="col"
                        className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Действие
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
                        <td className=" flex px-6 py-6 whitespace-nowrap gap-2 border-b  text-right text-2xl items-center font-medium">
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
                              message={"Вы уверены?"}
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
