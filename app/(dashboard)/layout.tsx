import { SideNavBar } from "@/components/ui/SideNavBar";

export default function Layout({children}:{
    children : React.ReactNode
}){
    return <div className="flex pb-4">
        <SideNavBar/>
        {children}
    </div>
}