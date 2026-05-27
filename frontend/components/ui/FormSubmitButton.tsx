
export default function FormSubmitButton({children} : {children : React.ReactNode}) {
  return (
    
    // font-semibold w-1/2 rounded-md pt-1 pb-1 text-[#CC9966] border-2 border-[#CC9966] hover:bg-[#CC9966] hover:text-[#6E3326]
    // ^ css reverse of colour highlight when button is selected
    <button className="font-semibold w-1/2 rounded-md pt-1 pb-1 mb-8 bg-secondary text-primary  hover:border-secondary hover:border-2 hover:text-secondary hover:bg-primary" type="submit">
        {children}
    </button>
  )
}
