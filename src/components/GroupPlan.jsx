import { IoArrowBack } from "react-icons/io5";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "./Modals/Modal";
import { CiEdit } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import DialogDelete from "./Modals/DialogDelete";
import CustomAxios from "../axios/customAxios";
import Loader from "./Constants/Louder";
import "react-datetime/css/react-datetime.css";
import { format } from "date-fns";
import { CustomProvider, DatePicker } from "rsuite";
import * as locales from "rsuite/locales";

const data = Object.keys(locales).map((key) => ({
  key,
  value: locales[key],
}));

const groupScheduleInitializationData = {
  id: 0,
  location: "",
  time: format(new Date(), "yyyy-MM-dd HH:mm"),
  name: "",
};

export default function GroupPlan() {
  const navigate = useNavigate();
  const groupId = useParams().id;
  const [localeKey, setLocaleKey] = useState("ruRU");
  const locale = data.find((item) => item.key === localeKey);
  const [showModal, setShowModal] = useState(false);
  const [groupSchedules, setGroupSchedules] = useState([]);
  const [groupSchedule, setGroupSchedule] = useState({
    ...groupScheduleInitializationData,
  });
  const [isEdit, setIsedit] = useState(false);
  const [isLoad, setIsLoad] = useState(true);

  const customAxios = CustomAxios();

  useEffect(() => {
    if (localStorage.getItem("isAuth") == "true") {
      if (groupSchedules.length == 0) {
        getSchedule();
      }
    }
  }, []);

  const getSchedule = async () => {
    try {
      const response = await customAxios({
        method: "get",
        url: `/group/${groupId}/schedules`,
      });
      let data = response.data.sort(function (a, b) {
        return new Date(a.time) - new Date(b.time);
      });
      setGroupSchedules(data);
      setIsLoad(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const getScheduleById = async (id) => {
    try {
      const response = await customAxios({
        method: "get",
        url: `schedule/${id}`,
      });
      return response.data;
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  function twoDigits(num) {
    return num < 10 ? `0${num}` : num;
  }

  // Create group schedule
  const createGroupScheduleHandler = async (e) => {
    e.preventDefault();
    try {
      const { id, ...data } = groupSchedule;
      await customAxios({
        method: "post",
        url: `/group/${groupId}/schedule`,
        data: JSON.stringify({
          ...data,
        }),
      });
      getSchedule();
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
      alert(err.response.data.message);
    } finally {
      setGroupSchedule({ ...groupScheduleInitializationData });
      setIsedit(false);
      setShowModal(false);
    }
  };

  // Edit group schedule
  let [oldTime, setOldTime] = useState("");

  const editGroupScheduleHandler = async (e) => {
    e.preventDefault();
    try {
      const { id, ...data } = groupSchedule;
      await customAxios({
        method: "put",
        url: `/schedule/${id}`,
        data: JSON.stringify(data),
      });
      getSchedule();
      setGroupSchedule({ ...groupScheduleInitializationData });
      setShowModal(false);
      toast.info("Успешно обновлено!!!", {
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
    } finally {
      setGroupSchedule({ ...groupScheduleInitializationData });
      setIsedit(false);
      setShowModal(false);
    }
  };

  // // Delete group schodule
  const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
  const [delMemberId, setDelMemberId] = useState(0);

  const deleteGroupScheduleHandler = async (choose) => {
    if (choose) {
      try {
        await customAxios({
          method: "delete",
          url: `schedule/${delMemberId}`,
        });
        getSchedule();
        toast.error("Успешно удалено!!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: "#fff",
          },
        });
        setIsShowDialogModalWin(false);
      } catch (err) {
        alert(err.response.data.message);
        setIsShowDialogModalWin(false);
      } finally {
        setDelMemberId(0);
      }
    } else {
      setIsShowDialogModalWin(false);
      setDelMemberId(0);
    }
  };

  return (
    <div className="bg-white p-4 overflow-y-auto" style={{ maxHeight: "95vh" }}>
      <div className="flex  justify-between border-b pb-4 border-gray-200">
        <button
          className="flex items-center text-lg rounded-lg border p-1 gap-2 bg-gray-300"
          onClick={() => navigate("/")}
        >
          <IoArrowBack />
          Назад
        </button>
        <button
          className="flex items-center text-lg rounded-lg border p-1 bg-green-400"
          onClick={() => {
            setShowModal(true);
            setGroupSchedule({ ...groupScheduleInitializationData });
          }}
        >
          <IoMdAdd />
          Добавить
        </button>
      </div>
      <div className="pb-3 pt-7">
        <h3 className="w-full flex justify-between">
          <span>Расписание</span>
        </h3>
        {isLoad ? (
          <Loader />
        ) : groupSchedules.length == 0 ? (
          <div className="w-full flex justify-center align-center p-10 ">
            <button
              className="flex items-center text-lg rounded-lg border p-5 pt-3 pb-3 gap-2 bg-green-400 font-bold"
              onClick={() => {
                setShowModal(true);
              }}
            >
              <IoMdAdd />
              Добавить
            </button>
          </div>
        ) : (
          <table className="w-full  table-auto mt-3 shadow border rounded-lg border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  №
                </th>
                <th
                  scope="col"
                  className="px-6 p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Название
                </th>
                <th
                  scope="col"
                  className="px-6 p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Время
                </th>
                <th
                  scope="col"
                  className="px-6 p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Локация
                </th>
                <th
                  scope="col"
                  className="px-6 p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Действие
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groupSchedules.map((item, index) => {
                return (
                  <tr className="hover:bg-gray-200 duration-200" key={index}>
                    <td className="px-6 p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.time}
                    </td>
                    <td className="px-6 p-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.location}
                    </td>
                    <td className=" flex px-6 py-6 whitespace-nowrap gap-2 text-right text-2xl items-center font-medium border-b-0">
                      <button
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={async () => {
                          setIsedit(true);
                          const data = await getScheduleById(item.id);
                          setOldTime(data.time);
                          setGroupSchedule({ ...data });
                          setShowModal(true);
                        }}
                      >
                        <CiEdit />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          setIsShowDialogModalWin(true);
                          setDelMemberId(item.id);
                        }}
                      >
                        <RiDeleteBin5Line />
                      </button>
                      {isShowDialogModalWin && (
                        <DialogDelete
                          onDialog={deleteGroupScheduleHandler}
                          message={"Вы уверены?"}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        isVisible={showModal}
        onClose={() => {
          setGroupSchedule({ ...groupScheduleInitializationData });
          setIsedit(false);
          setShowModal(false);
        }}
      >
        <div className="py-6 px-6 lg:px-8 text-left">
          <h3 className="mb-4 text-xl font-medium text-gray-900">
            Расписание
          </h3>
          <form
            className="space-y-1.5"
            action="#"
            onSubmit={
              isEdit ? editGroupScheduleHandler : createGroupScheduleHandler
            }
          >
            <label className="block text-sm font-medium text-gray-900">
              Название
            </label>
            <input
              type="text"
              placeholder="Название"
              value={groupSchedule.name}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 outline-none"
              onChange={(e) =>
                setGroupSchedule((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
            />

            <label className="block text-sm font-medium text-gray-900">
              Время
            </label>
            <CustomProvider locale={locale.value}>
              <DatePicker
                inputProps={{
                  className:
                    "w-full p-1.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900",
                }}
                value={new Date(groupSchedule.time)}
                format="yyyy-MM-dd HH:mm"
                editable={false}
                onSelect={(date) => {
                  setGroupSchedule((prev) => {
                    return {
                      ...prev,
                      time: format(new Date(date), "yyyy-MM-dd HH:mm"),
                    };
                  });
                }}
              />
            </CustomProvider>
            <label className="block text-sm font-medium text-gray-900">
              Локация
            </label>
            <input
              type="text"
              placeholder="Локация"
              value={groupSchedule.location}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 outline-none"
              onChange={(e) =>
                setGroupSchedule((prev) => {
                  return { ...prev, location: e.target.value };
                })
              }
            />
            <div className="flex justify-end pt-5">
              <button
                type="submit"
                className="w-100 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}
