import React, { use, useState } from 'react'

import { PiLineVerticalBold } from "react-icons/pi";

import StudentCounter from '../features/counter/studentCounter';

export default function Footer() {

  return (
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

        <StudentCounter/>

    </div>
  )
}
