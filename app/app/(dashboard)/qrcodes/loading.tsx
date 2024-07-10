import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 px-4 md:px-4 mt-6">
      <div className="space-y-3">
      </div>
      <Skeleton className="h-[470px] md:h-[200px] border-gray-500 border-[0.5px] shadow-md w-full rounded-xl" />
      <Skeleton className="h-[470px] md:h-[200px] border-gray-500 border-[0.5px] shadow-md w-full rounded-xl" />
      <Skeleton className="h-[470px] md:h-[200px] border-gray-500 border-[0.5px] shadow-md w-full rounded-xl" />
    </div>
  )
}
