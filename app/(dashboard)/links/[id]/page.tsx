"use client";

import { LinkCard } from "@/components/CardComponents/LinkCard";
import { LinkCardComponent } from "@/components/CardComponents/LinkCardDemoComponent";
import { LinkCardSpecific } from "@/components/CardComponents/LinkCardSpecific";
import { ArrowLeft, ArrowUpDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { PieChart } from "@/components/GraphicalComponents/PieChart";

export default function Page({ params }: any) {
  const id = params.id;
  const router = useRouter();

  return (
    <div>
      <div
        className="flex ml-10 cursor-pointer w-fit"
        onClick={() => router.push("/links")}
      >
        <ArrowLeft size={20} />
        <h1 className="ml-2 text-sm font-medium">Back to list</h1>
      </div>
      <LinkCardSpecific
        link={{
          title: "Main Page - Algorithms for Competitive Programming",
          shortLink: "bit.ly/cphead_only",
          longLink: "https://cp-algorithms.com/",
        }}
      />
      <div className="flex md:flex-row flex-col ml-8 mt-6 mr-8">
        <div className="flex-1 flex justify-between shadow-md p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Engagements</h1>
          <h1 className="text-2xl font-bold">7</h1>
        </div>
        <div className="flex-1 flex justify-between shadow-md ml-0 md:mt-0 mt-4 md:ml-4 p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Last 7 days</h1>
          <h1 className="text-2xl font-bold">10</h1>
        </div>
        <div className="flex-1 flex justify-between shadow-md ml-0 md:mt-0 mt-4 md:ml-4 p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Weekly change</h1>
          <div className="flex items-center">
            <ArrowUpDownIcon size={25} />
            <h1 className="text-2xl font-bold ml-1">+100%</h1>
          </div>
        </div>
      </div>
      <div className="mx-8 mt-6 border-[0.5px] rounded-xl px-3 py-4 shadow-md">
        <Label className="font-bold ml-2">Locations</Label>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Engagements</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">1</TableCell>
              <TableCell>India</TableCell>
              <TableCell className="text-right">5</TableCell>
              <TableCell className="text-right">100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="ml-0 md:ml-8 scale-75 md:scale-100 mt-12 shadow-md p-6 rounded-xl w-fit">
        <Label className="font-bold ml-3 text-lg">Devices</Label>
        <div className="mt-4">
        <PieChart/>
        </div>
      </div>
    </div>
  );
}
