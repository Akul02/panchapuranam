import React, { use, useState } from 'react'

import { PiLineVerticalBold } from "react-icons/pi";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import StudentCounter from '../features/counter/studentCounter';
import SubmitButton from '../ui/FormSubmitButton';

export default function Footer() {

  return (
    // <div className="bg-primary text-secondary w-full h-28 sticky bottom-0 flex justify-center items-center">
    //     <div className="font-semibold text-2xl">
    //         Student Zone
    //     </div>
    //     <PiLineVerticalBold size={70} color="secondary"/>
        // <div>
        //     <a href="/download">
        //         <div className="text-center font-semibold p-2 rounded-xl cursor-pointer bg-secondary text-primary">
        //             Download Certificate
        //         </div>
        //     </a>
        //     <p className="font-semibold">For those that have memorised the songs</p>
        // </div>

    //     <StudentCounter/>

    // </div>

    <div className="bg-primary w-full h-20 sticky bottom-0 text-secondary flex justify-center items-center lg:h-28">
        <div className="font-semibold text-lg text-center lg:text-2xl">
            Student Zone
        </div>
        <PiLineVerticalBold size={70} color="secondary"/>

        <div className="mr-2 sm:m-0">
            <a href="/download">
                <div className="text-center text-sm font-semibold p-1 rounded-xl cursor-pointer bg-secondary text-primary lg:text-base lg:p-2">
                    Download Certificate
                </div>
            </a>
            <p className="font-semibold text-sm text-center lg:text-base">For those that have memorised the songs</p>
        </div>

    </div>
  )
}
