"use client"
import { SideNavBar } from "@/components/NavigationBars/SideNavBar";
import withAuth from '@/components/Auth/WithAuth'

const Layout = ({children}:{
    children : React.ReactNode
})=>{

    return <div className="flex">
        <div className="md:block hidden">
        <SideNavBar/>
        </div>
        <div className="md:ml-[150px] w-full mt-12 md:pb-0">
        {children}
        </div>
    </div>
}

export default withAuth(Layout);