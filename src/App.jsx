import React, { useEffect } from 'react'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Constants/Layout';
import Groups from './components/Groups';
import Guide from './components/Guide';
import Hotel from './components/Hotel';
import Login from './components/Auth/Login';
import MembersGroup from './components/MembersGroup';
import GroupPlan from './components/GroupPlan';
import { createContext } from 'react';

export const AppContext = createContext(null);

const App = () => {

  useEffect(()=>{

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Layout/>}>
          <Route index element={<Groups/>}/> 
          <Route path='/guide' element={<Guide/>}/> 
          <Route path='/hotels' element={<Hotel/>}/> 
          <Route path='/group/:id/members' element={<MembersGroup/>}/> 
          <Route path='/group/:id/plan' element={<GroupPlan/>}/> 
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path="*" element={"$404"}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App