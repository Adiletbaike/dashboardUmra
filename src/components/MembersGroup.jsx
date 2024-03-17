import { useContext, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import Select from "react-select";  
import DialogDelete from "./Modals/DialogDelete";
import { AppContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import CustomAxios from "../axios/customAxios";
import { IoArrowBack } from "react-icons/io5";
import Loader from "./Constants/Louder";

const initialMemberData = {
  id: 0,
  firstName: "",
  lastName: "",
  phoneNumber: "",
  gender: '', 
  password: "",
  companyId: 0,
  username: "",
  birthday: "",
};

const MembersGroup = () => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  const { userData, setUserData, companyId } = useContext(AppContext);
  const navigate = useNavigate();
  const customAxios = CustomAxios();
  const params = useParams();
  const [isLoad, setIsLoad] = useState(true);

  // Table
  const [members, setMembers] = useState([]);
  const [memberData, setMemberData] = useState({
    isEdit: false,
    data: { ...initialMemberData },
  });

  useEffect(() => {
    if (userData.isAuth) {
      if (members.length == 0) {
        getAllMember();
      }
    }
  }, [userData]);

  const getAllMember = async () => {
    try {
      const response = await customAxios({
        method: "get",
        url: `group/${params.id}/participant`,
      });
      setMembers(response.data);
      setIsLoad(false);
    } catch (err) {
      console.log(err.message);
      setIsLoad(false);
    }
  };

  //add new member
  const addMemberHandler = async (e) => {
    e.preventDefault();
    const { id, ...data } = memberData.data;
    try {
      await customAxios({
        
        method: "post",
        url: `group/${params.id}/participant`,
        data: JSON.stringify({...data, companyId: companyId}),
      });
      getAllMember();
      setMemberData({
        isEdit: false,
        data: { ...initialMemberData },
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
  const [delParticipantId, setDelParticipantId] = useState(0);

  const areYouSureDelete = async (choose) => {
    if (choose) {
      const response = await customAxios({
        method: "delete",
        url: `group/${params.id}/participant/${delParticipantId}`,
      });
      getAllMember();
      toast.error("Ийгиликтүү өчүрүлдү!!!", {
        position: "top-right",
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsShowDialogModalWin(false);
      setDelParticipantId(0);
    } else {
      setIsShowDialogModalWin(false);
      setDelParticipantId(0);
    }
  };

  // Edit
  const editMemberData = async (e) => {
    e.preventDefault();
    const { id, companyId, ...data } = memberData.data;
    try {
      await customAxios({
        
        method: "put",
        url: `group/${params.id}/participant/${id}`,
        data: JSON.stringify({...data,}),
      });
      getAllMember();
      setMemberData({
        isEdit: false,
        data: { ...initialMemberData },
      });
      setShowModal(false);
      toast.success("Ийгиликтүү өзгөртүлдү!!!", {
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
  }
  return (
    <div className="bg-white p-4 overflow-x-scroll">
      <ToastContainer />
      <div className="flex justify-between border-b pb-4 border-gray-200">
        <button
          className="flex items-center text-lg rounded-lg border p-1 gap-2 bg-gray-300"
          onClick={() => navigate("/")}
        >
          <IoArrowBack />
          Back
        </button>
        <button
          className="flex items-center text-lg rounded-lg border p-1 bg-green-400"
          onClick={() => {
            setMemberData({
              isEdit: false,
              data: { ...initialMemberData },
            });
            setShowModal(true);
          }}
        >
          <IoMdAdd />
          Жаңы кошуу
        </button>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="py-6 px-6 lg:px-8 text-left mt-8">
            <h3 className="mb-1 text-xl font-medium text-gray-900">Мүчөлөр</h3>
            <form
              className="space-y-2"
              action="#"
              onSubmit={memberData.isEdit ? editMemberData : addMemberHandler}
            >
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
                  value={memberData.data.firstName}
                  placeholder="Аты"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => {
                    setMemberData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, firstName: e.target.value },
                      };
                    });
                  }}
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
                  value={memberData.data.lastName}
                  id="name"
                  placeholder="Фамилия"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => {
                    setMemberData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, lastName: e.target.value },
                      };
                    });
                  }}
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
                  value={memberData.data.phoneNumber}
                  placeholder="Телефон"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => {
                    setMemberData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, phoneNumber: e.target.value },
                      };
                    });
                  }}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="member-gender"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <Select
                  defaultValue={memberData.data.gender!=""?{label: "MALE", value: "MALE"}:""}
                  options={[{label: "MALE", value: "MALE"}, {label: "FEMALE", value: "FEMALE"}]}
                  onChange={(value) =>{
                    setMemberData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, gender: value.value},
                      };
                    });
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={memberData.data.birthday}
                  id="birthday"
                  placeholder="Birthday"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => {
                    setMemberData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, birthday: e.target.value.replace(/\//, '-')},
                      };
                    });
                  }}
                />
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
                  value={memberData.data.username}
                  id="login"
                  placeholder="Логин"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => {
                    setMemberData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, username: e.target.value },
                      };
                    });
                  }}
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
                  value={memberData.data.password}
                  id="password"
                  placeholder="Пароль"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => {
                    setMemberData((prev) => {
                      return {
                        ...prev,
                        data: { ...prev.data, password: e.target.value },
                      };
                    });
                  }}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-100 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  {memberData.isEdit ? "Өзгөртүү" : "Сактоо"}
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
              ) : members.length == 0 ? (
                <div className="flex w-full justify-center items-center p-5">
                  <span> Группа мучолору жок </span>
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        №
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Аты Фамилиясы
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
                        Жынысы
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
                        Логин
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Пароль
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Action
                      </th>
                      {/* <th scope="col" className="relative px-5 py-3">
                        <span className="sr-only">Edit</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {members.map((member, index) => (
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
                                {member.firstName} {member.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.phoneNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.birthday}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {member.password}
                        </td>
                        <td className=" flex px-6 py-6 whitespace-nowrap gap-2 border-none text-right text-2xl items-center font-medium">
                          <button
                            onClick={() => {
                              setMemberData(prev=>{return {isEdit: true, data: {
                                ...prev.data,
                                id: member.id,
                                firstName: member.firstName,
                                lastName: member.lastName,
                                phoneNumber: member.phoneNumber,
                                gender: member.gender,
                                birthday: member.birthday,
                                username: member.username,
                                password: member.password
                              }}})
                              setShowModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <CiEdit />
                          </button>
                          <button
                            onClick={() => {
                              setIsShowDialogModalWin(true),
                              setDelParticipantId(member.id);
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

export default MembersGroup;
