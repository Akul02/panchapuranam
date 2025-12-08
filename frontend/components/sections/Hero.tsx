import React from 'react'

import {Merriweather, Noto_Serif_Tamil, Arima} from "next/font/google";

const merriweather = Merriweather({
    subsets:["latin"],
    weight:["700"]
})

const noto_serif = Noto_Serif_Tamil({
    subsets: ["tamil"],
    weight: ["700"]
})

const arima = Arima({
    subsets:["tamil"],
    weight:["700"]
})



export default function Hero() {
  return (
    <div className="relative mt-12 w-[60%] aspect-[1920/1012] bg-[url('/hero_image.png')] bg-cover bg-center rounded-xl">

        <div className="absolute inset-0 bg-white/25"/>

        <div className="absolute inset-0 text-5xl font-semibold text-orange-800 pt-[10%] pl-[20%]">
            <p className={`${noto_serif.className}`}>பஞ்சபுராணம்</p>
            <p className={`${merriweather.className} mt-6`}>PANCHAPURANAM</p>
        </div>
    </div>
  )
}
