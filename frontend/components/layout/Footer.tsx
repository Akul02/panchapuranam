import React, { use, useState } from 'react'

import { PiLineVerticalBold } from "react-icons/pi";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

export default function Footer() {

  return (
    <div className="bg-[#6E3326] text-[#CC9966] w-full h-28 sticky bottom-0 flex justify-center items-center">
        <div className="font-semibold text-2xl">
            Student Zone
        </div>
        <PiLineVerticalBold size={70} color="#CC9966"/>
        <div>
            <a href="/download">
                <div className="text-center font-semibold p-2 rounded-xl cursor-pointer bg-[#CC9966] text-[#6E3326]">
                    Download Certificate
                </div>
            </a>
            <p className="font-semibold">For those that have memorised the songs</p>
        </div>
    </div>
  )
}
