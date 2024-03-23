import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";
import Modal from "./Modals/Modal";
import DialogDelete from "./Modals/DialogDelete";
import CustomAxios from "../axios/customAxios";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Constants/Louder";

const languages = [
  { label: "Кыргызча", value: "KG" },
  { label: "Рyсский", value: "RU" },
  { label: "Казакча", value: "KZ" },
  { label: "Озбекче", value: "UZ" },
  { label: "English", value: "EN" },
  { label: "Turkce", value: "TR" },
];

const initialGroupData = {
  isEdit: false,
  data: {
    id: "",
    name: "",
    quantity: 0,
    language: "",
    guideId: 0,
    guideName: "",
    makkahId: 0,
    makkahHotelName: "",
    madinaId: 0,
    madinaHotelName: "",
  },
};

const Groups = () => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const customAxios = CustomAxios();
  const [guides, setGuides] = useState([]);
  const [hotels, setHotels] = useState([]);

  // Table
  const [groups, setGroups] = useState([]);
  const [groupData, setGroupData] = useState(initialGroupData);

  useEffect(() => {
    if (localStorage.getItem('isAuth')=='true') {
      if (guides.length == 0) {
        getAllGuides();
      }
      if (hotels.length == 0) {
        getAllHotels();
      }
      if (groups.length == 0) {
        getAllGroups();
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
      alert(err.message);
      setIsLoad(false);
    }
  };

  const getAllHotels = async () => {
    try {
      const response = await customAxios({
        method: "get",
        url: "hotel",
      });
      setHotels(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  const getAllGroups = async () => {
    try {
      const response = await customAxios({
        method: "get",
        url: "group",
      });
      setGroups(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  // Add new group
  const addGroupHandler = async (e) => {
    e.preventDefault();
    try {
      const data = JSON.stringify({
        name: groupData.data.name,
        leadGroupId: groupData.data.guideId,
        language: groupData.data.language,
        makkahHotelId: groupData.data.makkahId,
        madinahHotelId: groupData.data.madinaId,
        countOfParticipant: groupData.data.quantity,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "group",
        data: data,
      };
      await customAxios(config);
      getAllGroups();
      setGroupData({ ...initialGroupData });
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

  // Delete
  const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
  const [delGroupId, setDelGroupId] = useState(0);

  const areYouSureDelete = async (choose) => {
    if (choose) {
      try {
        await customAxios({
          method: "delete",
          url: `group/${delGroupId}`,
        });
        getAllGroups();
        setIsShowDialogModalWin(false);
        toast.success("Ийгиликтүү өчүрүлдү!!!", {
          position: "top-right",
          autoClose: 3000, // 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setDelGroupId(0);
      } catch (err) {
        alert(err.response.data.message);
        setIsShowDialogModalWin(false);
      }
    } else {
      setIsShowDialogModalWin(false);
    }
  };

  // Edit group data
  const editGroupDataHandler = async (e) => {
    e.preventDefault();

    console.log(groupData);

    try {
      const data = JSON.stringify({
        name: groupData.data.name,
        leadGroupId: groupData.data.guideId,
        language: groupData.data.language,
        makkahHotelId: groupData.data.makkahId,
        madinahHotelId: groupData.data.madinaId,
        countOfParticipant: groupData.data.quantity,
      });

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `group/${groupData.data.id}`,
        data: data,
      };

      await customAxios(config);
      getAllGroups();
      setGroupData({ ...initialGroupData });
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

  return (
    <div className="bg-white p-4">
      <ToastContainer />
      <div className="flex justify-end border-b pb-4 border-gray-200">
        <button
          className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
          onClick={() => {
            setGroupData((prev) => {
              return { ...prev, data: { ...initialGroupData.data } };
            });
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
            setGroupData({...initialGroupData});
          }}
        >
          <div className="py-6 px-6 lg:px-8 text-left">
            <h3 className="mb-4 text-xl font-medium text-gray-900">Группа</h3>
            <form
              className="space-y-3"
              action="#"
              onSubmit={
                groupData.isEdit ? editGroupDataHandler : addGroupHandler
              }
            >
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
                  value={groupData.data.name}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) =>
                    setGroupData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, name: e.target.value },
                      };
                    })
                  }
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
                  min="0"
                  max="100"
                  value={groupData.data.quantity}
                  id="number"
                  placeholder="Саны"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                  onChange={(e) =>
                    setGroupData((prev) => {
                      return {
                        ...prev,
                        data: {
                          ...prev.data,
                          quantity: parseInt(e.target.value, 10),
                        },
                      };
                    })
                  }
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
                  <Select
                    defaultValue={
                      languages.filter(
                        (item) => item.value == groupData.data.language
                      )[0]
                    }
                    options={languages}
                    onChange={(value) =>
                      setGroupData((prev) => {
                        return {
                          ...prev,
                          data: {
                            ...prev.data,
                            language: value.value,
                          },
                        };
                      })
                    }
                  />
                </div>
                <div className="w-[50%]">
                  <label
                    htmlFor="guide"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Умра башчы
                  </label>
                  <Select
                    defaultValue={
                      groupData.data.guideId != 0
                        ? {
                            value: groupData.data.guideId,
                            label: groupData.data.guideName,
                          }
                        : ""
                    }
                    options={guides.map((item) => {
                      return {
                        value: item.id,
                        label: item.firstName + " " + item.lastName,
                      };
                    })}
                    onChange={(value) =>
                      setGroupData((prev) => {
                        return {
                          ...prev,
                          data: {
                            ...prev.data,
                            guideId: value.value,
                            guideName: value.label,
                          },
                        };
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-[48%]">
                  <label
                    htmlFor="hotelMakkah"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Мекке отель
                  </label>
                  <Select
                    options={hotels.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    defaultValue={
                      groupData.data.makkahId != 0
                        ? {
                            value: groupData.data.makkahId,
                            label: groupData.data.makkahHotelName,
                          }
                        : ""
                    }
                    onChange={(value) =>
                      setGroupData((prev) => {
                        return {
                          ...prev,
                          data: {
                            ...prev.data,
                            makkahId: value.value,
                            makkahHotelName: value.label,
                          },
                        };
                      })
                    }
                  />
                </div>
                <div className="w-[50%]">
                  <label
                    htmlFor="hotelMedina"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Мадина отель
                  </label>
                  <Select
                    options={hotels.map((item) => {
                      return {
                        value: item.id,
                        label: item.name,
                      };
                    })}
                    defaultValue={
                      groupData.data.madinaId != 0
                        ? {
                            value: groupData.data.madinaId,
                            label: groupData.data.madinaHotelName,
                          }
                        : ""
                    }
                    onChange={(value) =>
                      setGroupData((prev) => {
                        return {
                          ...prev,
                          data: {
                            ...prev.data,
                            madinaId: value.value,
                            madinaHotelName: value.label,
                          },
                        };
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end pt-5">
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
              {isLoad ? (
                <Loader />
              ) : groups.length == 0 ? (
                <div className="flex w-full justify-center items-center p-5">
                  <span> Группа башчылары жок </span>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      №
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Аты
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cаны
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Группа тили
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Умра башчы
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Мекке
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Мадина
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Программа
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </thead>

                  <tbody className="bg-white w-full">
                    {groups.map((group, index) => (
                      <tr key={index} className="hover:bg-gray-200 w-full">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                <Link
                                  to={`/group/${group.groupId}/members`}
                                  state={{ quality: group.countOfParticipant }}
                                >
                                  {group.name}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {group.countOfParticipant}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {group.language}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {group.leadOfGroupFullName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {group.makkahHotel.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {group.madinahHotel.name}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                <button className="bg-green-300 hover:bg-green-500 duration-500 p-1 rounded-md">
                                  <Link to={`/group/${group.groupId}/plan`}>
                                    Программасы
                                  </Link>
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 gap-2 text-right text-2xl items-center font-medium">
                          <button
                            onClick={() => {
                              setGroupData({
                                isEdit: true,
                                data: {
                                  id: group.groupId,
                                  name: group.name,
                                  quantity: group.countOfParticipant,
                                  language: group.language,
                                  guideId: guides.filter(
                                    (item) =>
                                      item.firstName.trim() +
                                        " " +
                                        item.lastName.trim() ==
                                      group.leadOfGroupFullName
                                  )[0]?.id,
                                  guideName: group.leadOfGroupFullName,
                                  makkahId: group.makkahHotel.id,
                                  makkahHotelName: group.makkahHotel.name,
                                  madinaId: group.madinahHotel.id,
                                  madinaHotelName: group.madinahHotel.name,
                                },
                              });
                              setShowModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <CiEdit />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={(e) => {
                              setDelGroupId(group.groupId);
                              setIsShowDialogModalWin(true);
                            }}
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

export default Groups;
