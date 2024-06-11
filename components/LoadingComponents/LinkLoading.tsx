import linkLoad from '@/app/assets/LottieAnimations/LoadingBlue.json'
import Lottie from 'lottie-react'

export function LinkLoading(){
    return <div className='flex justify-center items-center h-screen'><div className='w-64 h-64'><Lottie loop={true} animationData={linkLoad}/></div></div>
}