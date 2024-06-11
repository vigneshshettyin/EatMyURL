import linkLoad from '@/app/assets/LottieAnimations/NoData.json'
import Lottie from 'lottie-react'

export function NoDataLoading(){
    return <div className='flex justify-center items-center mt-4 h-full'><div className='w-48 h-48'><Lottie loop={true} animationData={linkLoad}/></div></div>
}