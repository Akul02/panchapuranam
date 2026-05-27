
export default function SectionHeader( {children, title} : {children?: React.ReactNode, title : string}) {
  return (
    <div className="flex items-center gap-4">
        <hr className="bg-primary flex-1 h-[2px]"/>
        <div className="flex items-center gap-2">
            <div className="text-primary font-semibold">{title}</div>
            {children}
        </div>
        <hr className="bg-primary flex-1 h-[2px]"/>
    </div>
  )
}
