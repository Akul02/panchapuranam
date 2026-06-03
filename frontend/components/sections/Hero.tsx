import { merriweather, merriweatherSans, notoSerif } from "../ui/fonts";

export default function Hero() {
  return (
    // relative mt-12 w-[50%] aspect-[1920/1012] bg-[url('/hero_image.png')] bg-cover bg-center rounded-xl
    <div className="relative w-full aspect-[1920/1012] bg-[url('/hero_image.png')] bg-cover bg-center lg:mt-20 lg:w-[70%] 2xl:w-[55%]">

        <div className="absolute inset-0 bg-white/25"/>

        <div className="absolute pt-[10%] pl-[15%] inset-0 text-2xl font-semibold text-orange-800 sm:text-3xl md:text-4xl xl:text-5xl">
            <p className={`font-tamil font-bold`}>பஞ்சபுராணம்</p>
            <p className={`font-heading font-bold mt-6`}>PANCHAPURANAM</p>
        </div>
    </div>
  )
}