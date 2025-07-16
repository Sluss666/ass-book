interface WarnIT {
    children?: React.ReactNode
    status:string
    alternativeStyles?:string
}
const CommonWarn = ({children, status, alternativeStyles}:WarnIT)=>{
    const colorClases = status == 'error' ? 'bg-red-600 text-white font-bold text-2xl' :'bg-green-600 text-white font-semibold text-2xl'
    return (
        <div className="relative grid w-full justify-center">
            <div className={`relative px-3 py-2 text-center ${alternativeStyles ? alternativeStyles : ''} ${colorClases}`}>
                {children}
            </div>
        </div>
        
    )
}
export default CommonWarn