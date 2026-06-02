export default function NavButton({ className = "", children } : {className?: string, children : React.ReactNode}) {
  return (
    <div className={`${className} font-semibold border-2 p-2 rounded-xl flex justify-center text-accent border-accent bg-primary cursor-pointer hover:bg-accent hover:text-primary`}>
        {children}
    </div>
  )
}
