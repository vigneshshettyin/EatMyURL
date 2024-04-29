import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col mt-12 px-2">
      <div className="md:ml-0 ml-4">
        <Skeleton className="h-12 w-[250px]" />
      </div>
      <div className="flex md:flex-row flex-col mt-6">
        <div className="flex-1 md:ml-0 ml-4">
          <Skeleton className="h-[165px] rounded-xl" />
        </div>
        <div className="flex-1 ml-4">
          <Skeleton className="h-[165px] md:mt-0 mt-3 rounded-xl" />
        </div>
        <div className="flex-1 ml-4">
          <Skeleton className="h-[165px] md:mt-0 mt-3 rounded-xl" />
        </div>
        </div>
        <div className="flex mt-8 md:flex-row flex-col">
          <div className="flex-1 ml-4 md:ml-0">
            <Skeleton className="h-[265px] rounded-xl" />
          </div>
          <div className="flex-1 ml-4 mt-3 md:mt-0">
            <Skeleton className="h-[265px] rounded-xl" />
          </div>
        </div>
      </div>
  );
}
