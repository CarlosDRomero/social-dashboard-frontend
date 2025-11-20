import { useState, type PropsWithChildren } from "react"
import { cn } from "../cn"
import ArrowIcon from "../icons/arrow"
import TickIcon from "../icons/tick"
import CrossIcon from "../icons/cross"
import SpinnerIcon from "../icons/spinner"

interface DashboardWrapperProps extends PropsWithChildren {
    title: string
    isSuccess: boolean
    isError: boolean
    isLoading: boolean
}
const DashboardWrapper = ({children, title, isError, isLoading, isSuccess}: DashboardWrapperProps)=>{
    const [hidden, setHidden] = useState(true)
    return (
        <div className="my-2">
            <div className={cn("flex w-full p-4 justify-between mb-2", {
                "hover:bg-slate-200": isSuccess,
                "shadow-xl": hidden,
                "bg-slate-200": !hidden || isLoading
            })}
                onClick={(e) => {if (isSuccess) setHidden(!hidden)}}
            >
                <div className={cn("flex gap-x-4 font-bold text-lg", {
                    "text-gray-500": isLoading
                })}>
                    {isSuccess && <TickIcon/>}
                    {isError && <CrossIcon/>}
                    {isLoading && <SpinnerIcon/>}
                    <p>{title}</p>
                </div>
                {isSuccess && <ArrowIcon up = {hidden}/>}
            </div>
            <div className="px-4 w-full">
                <div className="w-full border-l-2 px-8 border-slate-300">
                    {!hidden && children}

                </div>

            </div>
        </div>
    )

}
export default DashboardWrapper