import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-6 px-4 md:px-4 mt-4">
      <div className="space-y-2">
      </div>
      <Skeleton className="h-[240px] md:h-[190px] border-gray-500 border-[0.5px] shadow-md w-full rounded-xl" />
      <Skeleton className="h-[240px] md:h-[190px] border-gray-500 border-[0.5px] shadow-md w-full rounded-xl" />
      <Skeleton className="h-[240px] md:h-[190px] border-gray-500 border-[0.5px] shadow-md w-full rounded-xl" />
    </div>
  )
}
