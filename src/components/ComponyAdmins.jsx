import React, { useContext, useEffect, useState } from "react";
import { CiEdit, CiLogout } from "react-icons/ci";
import { FaKaaba } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Modal from "./Modals/Modal";
import CustomAxios from "../axios/customAxios";
import { AppContext } from "../App";
import { IoArrowBack } from "react-icons/io5";
import Loader from "./Constants/Louder";
import { RiDeleteBin5Line } from "react-icons/ri";
import DialogDelete from "./Modals/DialogDelete";

export default function CompanyAdmins(){

    const {companyName, companyId} = useParams();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const customAxios = CustomAxios();
    const {userData, setUserData} = useContext(AppContext);
    const navigate = useNavigate()
    const [isLoad, setIsLoad] = useState(true);
    
    const [admins, setAdmins] = useState([]);
    const [adminData, setAdminData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        username: "",
        password: ""
    });

    useEffect(()=>{
        if(!userData.isAuth){
            navigate('/login')
        }
        if(admins.length==0){
            getAllAdmins();
        }
    }, [userData])

    const getAllAdmins = ()=>{
        customAxios({
            method : "get",
            url: `company/${companyId}/admins`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            },
        })
        .then(res=>{
            setAdmins(res.data);
            setIsLoad(false);
        })
        .catch(rej=>{
            alert(rej.message)
            alert(rej.message)
        })
    }

    // add new admin
    const addAdminHandler = (e)=>{
        e.preventDefault();

        customAxios({
            method: "post",
            url: `company/${companyId}/admin?language=RU`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userData.token}`
            },
            data: JSON.stringify({
                firstName: adminData.firstName,
                lastName: adminData.lastName,
                phoneNumber: adminData.phoneNumber,
                companyId: companyId,
                username: adminData.username,
                password: adminData.password
            })
        })
        .then(res=>{
            getAllAdmins()
            setAdminData({
                id: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                username: "",
                password: ""
            })
            setShowModal(false);
            toast.success("Ийгиликтүү сакталды!!!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        })
        .catch(rej=>{
            alert(rej.message)
        })
    }
    
    //Delete
    const [isShowDialogModalWin, setIsShowDialogModalWin] = useState(false);
    const areYouSureDelete = async(choose, id) => {
      if (choose) {
        const response = await customAxios({
          method: "delete",
          url: `company/${companyId}/admin/${id}`,
          headers: {
            'Authorization': `Bearer ${userData.token}`
          },
        });
        getAllAdmins();
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

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between gap-2 px-5 py-8 border-b border-neutral-700 bg-black">
            <button className="flex gap-5">
                <FaKaaba fontSize={28} color="yellow" />
                <span className="text-neutral-100 text-lg font-bold">{companyName}</span>
            </button>
            <button className="flex items-center gap-2 bg-orange-400 rounded-lg px-3 py-1"
                onClick={()=>{
                    setUserData({
                        isAuth: false,
                        isSuperAdmin: false,
                        token: ''
                    });
                    localStorage.setItem('isAuth', false);
                    localStorage.setItem('isSuperAdmin', false);
                    localStorage.setItem('token', '');
                }}
            >
                <CiLogout color="yellow" />
                <span className="text-white text-sm font-normal">Чыгуу</span>
            </button>
        </div>
            <div className="bg-white p-4">
                <ToastContainer />
                <div className="flex justify-between items-center border-b pb-4 border-gray-200">
                    <button
                        className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
                        onClick={()=>navigate('/')}
                    >
                        <IoArrowBack />
                        Back
                    </button>
                    <button
                    className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
                    onClick={() => {
                        setAdminData({
                            id: "",
                            firstName: "",
                            lastName: "",
                            phoneNumber: "",
                            username: "",
                            password: ""
                        });
                        setShowModal(true);
                    }}
                    >
                        <IoMdAdd />
                        Жаңы кошуу
                    </button>
                    <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
                        <div className="py-6 px-6 lg:px-8 text-left">
                            <h3 className="mb-4 text-xl font-medium text-gray-900">Компания</h3>
                            <form
                                className="space-y-3"
                                action="#"
                                onSubmit={isEdit ? editAdminDataHandler : addAdminHandler}
                            >
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Аты
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Аты"
                                    value={adminData.firstName}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, firstName: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Фамилия
                                </label>
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder="Фамилия"
                                    value={adminData.lastName}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, lastName: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Телефон
                                </label>
                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Телефон"
                                    value={adminData.phoneNumber}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, phoneNumber: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="groups"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={adminData.username}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, username: e.target.value}})}
                                />
                            </div>
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Пороль
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Пороль"
                                    value={adminData.password}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    onChange={(e) =>setAdminData(prev=>{return {...prev, password: e.target.value}})}
                                />
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
                        {
                            isLoad?
                            <Loader/>:
                            admins.length===0?
                            <div className="p-7 flex justify-center">
                                <button
                                    className="flex justify-end items-center text-lg rounded-lg border p-1 bg-green-400"
                                    onClick={() => {
                                        setAdminData({
                                            id: "",
                                            firstName: "",
                                            lastName: "",
                                            phoneNumber: "",
                                            username: "",
                                            password: ""
                                        });
                                        setShowModal(true);
                                    }}
                                    >
                                        <IoMdAdd />
                                        Жаңы кошуу
                                    </button>
                            </div>:
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
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Аты фамилиясы
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Телефон
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full"
                                        >
                                            Username
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {admins.map((admin, index) => (
                                    <tr key={index} className="hover:bg-gray-200 duration-300">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {index + 1}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.fullName}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.phoneNumber}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.username}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm font-medium text-gray-900">
                                                {admin.password}
                                            </div>
                                        </td>
                                        <td className=" flex px-6 py-6 whitespace-nowrap gap-2 border-none text-right text-2xl items-center font-medium">
                                        <button
                                            onClick={() => setIsShowDialogModalWin(true)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <RiDeleteBin5Line />
                                        </button>
                                        {isShowDialogModalWin && (
                                            <DialogDelete
                                            onDialog={(choose)=>areYouSureDelete(choose, admin.id)}
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
        </div>
    )
}