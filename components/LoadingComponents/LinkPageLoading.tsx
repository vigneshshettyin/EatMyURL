import linkLoad from '@/app/assets/LottieAnimations/LinkLoads.json'
import Lottie from 'lottie-react'

export function LinkPageLoading(){
    return <div className='flex justify-center items-center h-screen'><div className='w-44 h-44'><Lottie loop={true} animationData={linkLoad}/></div></div>
}