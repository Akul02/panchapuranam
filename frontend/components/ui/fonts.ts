import {Merriweather, Noto_Serif_Tamil, Arima, Cormorant_Garamond, Source_Sans_3, Roboto, Merriweather_Sans} from "next/font/google";

export const merriweather = Merriweather({
    subsets:["latin"],
    weight:["400","300","700","900"],
    variable: "--font-merriweather"
})

export const notoSerif = Noto_Serif_Tamil({
    subsets: ["tamil"],
    weight: ["100","200","300","400","500","600","700","800","900"],
    variable: "--font-tamil"
})

export const sourceSans = Source_Sans_3({
    subsets:["latin"],
    weight:["200","300","400","500","600","700","800","900"],
    variable: "--font-sourceSans"
})


export const arima = Arima({
    subsets:["tamil"],
    weight:["700"],
})

export const cormorantG = Cormorant_Garamond({
    subsets:["latin"],
    weight:["400", "500", "600", "700"]
})

export const merriweatherSans = Merriweather_Sans({
    subsets:["latin"],
    weight:["700"]
})