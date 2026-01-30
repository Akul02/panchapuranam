import React from 'react'

import { PiLineVerticalBold } from "react-icons/pi";

export default function Footer() {
  return (
    <div className="bg-[#6E3326] text-[#CC9966] w-full h-28 sticky bottom-0 flex justify-center items-center">
        <div className="font-semibold text-2xl">
            Student Zone
        </div>
        <PiLineVerticalBold size={70} color="#CC9966"/>
        <div>
            <div className="h-min text-center font-semibold p-2 rounded-xl cursor-pointer bg-[#CC9966] text-[#6E3326]">
                <a href="/download">Download Certificate</a>
            </div>
            <p>For those that have memorised the above songs</p>
        </div>
    </div>
  )
}
