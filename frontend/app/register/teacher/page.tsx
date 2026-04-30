import React from 'react'
import RegisterTeacher from '../../../components/features/admin/RegisterTeacher'
import Navbar from "../../../components/layout/Navbar"

const register = () => {
  return (
    <div>
        <Navbar showDashButton = {true} />
        <RegisterTeacher/>
    </div>
  )   
}

export default register