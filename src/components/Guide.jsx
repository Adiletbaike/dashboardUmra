import React, { useContext, useEffect, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import Modal from "./Modals/Modal";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogDelete from "./Modals/DialogDelete";
import {AppContext} from '../App';
import CustomAxios from "../axios/customAxios";
import Loader from "./Constants/Louder";

const Guide = () => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [guides, setGuides] = useState([]);
  const {userData, setUserData} = useContext(AppContext);
  const customAxios = CustomAxios();
  const [isLoad, setIsLoad] = useState(true);

  const [guideData, setGuideData] = useState({
    isEdit: false,
    data: {
      id: '',
      name: '',
      surname: '',
      phone: '',
      education: ''
    }
  })

  useEffect(()=>{
    if(userData.isAuth){
      if(guides.length == 0){
        getAllGuides();
      }
    }
  }, [userData])

  const getAllGuides = async ()=>{  
    try{
      const response = await customAxios({
        method: "get",
        url: 'lead-group',
        headers: {
          'Authorization': `Bearer ${userData.token}`
        }
      });
      setGuides(response.data);
      setIsLoad(false);
    }
    catch(err){
      alert(err.message)
      setIsLoad(false);
    }
  }

  // add new guide
  const addGuideHandler = async (e) => {
    e.preventDefault();
    try{
      const data = await JSON.stringify({
            firstName: guideData.data.name,
            lastName: guideData.data.surname,
            phoneNumber: guideData.data.phone,
            university: guideData.data.education
          });
      const response = await customAxios({
        method: "post",
        url: 'lead-group',
        headers: {
          'Authorization': `Bearer ${userData.token}`
        },
        data: data
      })
      getAllGuides();
      setGuideData({
        ...guideData,
        data: {
          id: '',
          name: '',
          surname: '',
          phone: '',
          education: ''
        }
      })
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
    }catch(err){
      alert(err.message)
    }
    
    
    
  };

  // Delete
  const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
  const areYouSureDelete = async(choose, id) => {
    if (choose) {
      const response = await customAxios({
        method: "delete",
        url: `lead-group/${id}`,
        headers: {
          'Authorization': `Bearer ${userData.token}`
        },
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
      setIsShowDialogModalWin(false)
    } else {
      setIsShowDialogModalWin(false)
    }
  };

  // Edit guide data
  const handleEditValues = async(e) => {
    e.preventDefault();
    try{

      const data = await JSON.stringify({
        firstName: guideData.data.name,
        lastName: guideData.data.surname,
        phoneNumber: guideData.data.phone,
        university: guideData.data.education
      });
      const response = await customAxios({
        method: "put",
        url: `lead-group/${guideData.data.id}`,
        headers: {
          'Authorization': `Bearer ${userData.token}`
        },
        data: data
      })
      getAllGuides();
      setGuideData({
        isEdit: false,
        data:{
          id: '',
          name: '',
          surname: '',
          phone: '',
          education: ''
        }
      })
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

    }catch(err){
      alert(err.message)
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
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={e=>setGuideData(prev=>{return guideData.isEdit?{...prev, data: {...prev.data, name: e.target.value}}: {...prev, data: {...prev.data, id: e.target.value, name: e.target.value}}})}
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
                  value       ={guideData.data.surname}
                  name="surname"
                  id="surname"
                  placeholder="Фамилиясы"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={e=>setGuideData(prev=>{return {...prev, data: {...prev.data, surname: e.target.value}}})}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={e=>setGuideData(prev=>{return {...prev, data: {...prev.data, phone: e.target.value}}})}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={e=>setGuideData(prev=>{return {...prev, data: {...prev.data, education: e.target.value}}})}
                />
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
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {
                isLoad?
                <Loader/>:
                guides.length==0?
                <div className="flex w-full justify-center items-center p-5">
                  <span > Группа башчылары жок </span>
                </div>:
                <table className="min-w-full divide-y divide-gray-200">
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
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {guides.map((person, index) => (
                      <tr key={index} className="hover:bg-gray-200 duration-300">
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
                                }
                              })
                              setShowModal(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <CiEdit />
                          </button>
                          <button
                            onClick={() => setIsShowDialogModalWin(true)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <RiDeleteBin5Line />
                          </button>
                          {isShowDialogModalWin && (
                            <DialogDelete
                              onDialog={(choose)=>areYouSureDelete(choose, person.id)}
                              message={"Чындап өчүрүүнү каалайсызбы?"}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
