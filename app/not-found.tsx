"use client"
import linkLoad from '@/app/assets/LottieAnimations/NotFoundLoad.json'
import { Button } from '@/components/ui/button'
import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation'

export default function Found(){
    const router = useRouter()

    return <div className='flex justify-center items-center h-screen flex-col'> 
    <div className='w-[500px] h-[500px]'><Lottie loop={true} animationData={linkLoad}/></div>
    <Button onClick={()=>router.push('/app/home')}>Back to Home</Button>
    </div>
}