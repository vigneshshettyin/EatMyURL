import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3 px-16 mt-12">
      <div className="space-y-2">
        
      </div>
      <Skeleton className="h-[165px] w-full rounded-xl" />
      <Skeleton className="h-[165px] w-full rounded-xl" />
      <Skeleton className="h-[165px] w-full rounded-xl" />
    </div>
  )
}
