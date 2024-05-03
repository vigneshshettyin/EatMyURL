"use client"
import { SideNavBar } from "@/components/NavigationBars/SideNavBar";
import withAuth from '@/components/Auth/WithAuth'

const Layout = ({children}:{
    children : React.ReactNode
})=>{

    return <div className="flex pb-4">
        <div className="md:block hidden">
        <SideNavBar/>
        </div>
        <div className="md:ml-[150px] w-full mt-[46px]">
        {children}
        </div>
    </div>
}

export default withAuth(Layout);