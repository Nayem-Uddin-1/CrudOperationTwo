import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router";

import UserData from '../component/UserData'
import ListData from '../component/ListData'
import AdminLogin from '../component/AdminLogin';

function Home() {
  return (
    <>
      

      <BrowserRouter>
        <Routes>
          <Route path="/userdata" element={<UserData />} />
          <Route path="/listdata" element={<ListData />} />
          <Route path="/" element={<AdminLogin />} />

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default Home