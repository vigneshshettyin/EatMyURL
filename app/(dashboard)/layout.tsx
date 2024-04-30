"use client"
import { SideNavBar } from "@/components/NavigationBars/SideNavBar";
import withAuth from '@/components/Auth/WithAuth'

const Layout = ({children}:{
    children : React.ReactNode
})=>{

    return <div className="flex pb-4">
        <SideNavBar/>
        <div className="ml-[40px] md:ml-[150px] w-full mt-[34px]">
        {children}
        </div>
    </div>
}

export default withAuth(Layout);