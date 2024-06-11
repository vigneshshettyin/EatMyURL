import linkLoad from '@/app/assets/LottieAnimations/LinksEmpty.json'
import Lottie from 'lottie-react'

export function EmptyLoading(){
    return <div className='flex justify-center mt-20 h-screen'><div className='w-72 h-72'><Lottie loop={true} animationData={linkLoad}/></div></div>
}