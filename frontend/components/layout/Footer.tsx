import React, { use, useState } from 'react'

import { PiLineVerticalBold } from "react-icons/pi";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import StudentCounter from '../features/counter/studentCounter';
import SubmitButton from '../ui/FormSubmitButton';

export default function Footer() {

  return (
    <div className="bg-primary text-secondary w-full h-28 sticky bottom-0 flex justify-center items-center">
        <div className="font-semibold text-2xl">
            Student Zone
        </div>
        <PiLineVerticalBold size={70} color="secondary"/>
        <div>
            <a href="/download">
                <div className="text-center font-semibold p-2 rounded-xl cursor-pointer bg-secondary text-primary">
                    Download Certificate
                </div>
            </a>
            <p className="font-semibold">For those that have memorised the songs</p>
        </div>

        <StudentCounter/>

    </div>
  )
}
