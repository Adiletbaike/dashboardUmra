import React, { useEffect, useState } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Constants/Layout';
import Groups from './components/Groups';
import Guide from './components/Guide';
import Hotel from './components/Hotel';
import Dashboard from './components/Dashboard';
import Login from './components/Auth/Login';
import MembersGroup from './components/MembersGroup';
import GroupPlan from './components/GroupPLan';
import { createContext } from 'react';
import Componies from './components/Companies';
import CompanyAdmins from './components/ComponyAdmins';

export const AppContext = createContext(null);

const App = () => {
  const [userData, setUserData] = useState({
    isAuth: false,
    isSuperAdmin:false,
    token: ''
  });
  const [companyId, setCompanyId] = useState(1);

  useEffect(()=>{
    if(!userData.isAuth && localStorage.getItem('isAuth')=='true'){
      setUserData({
        isAuth: localStorage.getItem('isAuth')=='true',
        isSuperAdmin: localStorage.getItem('isSuperAdmin')=='true',
        token: localStorage.getItem('token')
      })
    }
  }, []);

  return (
    <AppContext.Provider value={{userData, setUserData, companyId}}>
      <BrowserRouter>
        <Routes>
          {
            userData.isSuperAdmin?
              <>
                <Route path='/' element={<Componies/>}/> 
                <Route path='/:companyName/:companyId/admins' element={<CompanyAdmins/>}/> 
              </>
            :
            <Route path='/' element={<Layout/>}>
              <Route index element={<Dashboard/>}/> 
              <Route path='/groups' element={<Groups/>}/> 
              <Route path='/guide' element={<Guide/>}/> 
              <Route path='/hotels' element={<Hotel/>}/> 
              <Route path='/group/:id/members' element={<MembersGroup/>}/> 
              <Route path='/group/:id/plan' element={<GroupPlan/>}/> 
            </Route>
          }
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App