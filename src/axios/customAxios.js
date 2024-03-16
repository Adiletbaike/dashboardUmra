import axios from "axios";
import { AppContext } from "../App";
import { useContext } from "react";

const baseUrl = "http://3.70.156.253:8080/api/v1/";

export default function CustomAxios(){

    const {userData, setUserData} = useContext(AppContext);

    return axios.create({
        baseURL: baseUrl,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        }
    })
}