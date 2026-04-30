import React from 'react'
import RegisterStudent from '../../../components/features/teacher/RegisterStudent'
import Navbar from "../../../components/layout/Navbar"

const register = () => {
  return (
    <div>
        <Navbar showDashButton = {true} />
        <RegisterStudent/>
    </div>
  )   
}

export default register