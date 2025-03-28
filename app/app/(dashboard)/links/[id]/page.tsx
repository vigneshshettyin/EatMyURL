"use client";

import {
  ArrowLeft,
  ArrowUpDownIcon,
  Calendar,
  Copy,
  LinkIcon,
  Pencil,
  Share2,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { PieChart } from "@/components/GraphicalComponents/PieChart";
import { Button } from "@/components/ui/button";
import { LinkShareDialog } from "@/components/DialogComponents/LinkShareDialog";
import { EditLinkDialog } from "@/components/DialogComponents/EditLinkDialog";
import { copyToClipboard } from "@/lib/utils";
import { headerAnalyticsType, linkType } from "@/interfaces/types";
import { useEffect, useState } from "react";
import { getLinkDetailsWithAnalytics } from "@/lib/actions/getLinksAction";
import { useRouter } from "next/navigation";
import { LinkPageLoading } from "@/components/LoadingComponents/LinkPageLoading";
import { NoDataLoading } from "@/components/LoadingComponents/NoDataLoading";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  function decodeId(encodedStr: string) {
    const paddedEncodedStr =
      encodedStr.replace(/-/g, "+").replace(/_/g, "/") +
      "===".slice((encodedStr.length + 3) % 4);
    const decodedStr = Buffer.from(paddedEncodedStr, "base64").toString(
      "utf-8"
    );
    return parseInt(decodedStr, 10);
  }


  const [fetchLink, setfetchLink] = useState<linkType>({
    id: 1,
    user_id: 42,
    short_code: "e7b9f3",
    long_url: "https://example.com/e7b9f3a7-0a15-4b7d-8d62-0d5f1a52e73e",
    created_at: new Date("2023-05-28T12:34:56Z"),
    title: "Sample Title",
    _count: {
      click_analytics: 100,
    },
  });

  const [headerAnalytics, setHeaderAnalytics] = useState<headerAnalyticsType>({
    totalVisitsThisWeek: 0,
    totalVisitsLastWeek: 0,
    percentageChange: 0,
    devices: [
      { device: "Desktop", engagements: 720 },
      { device: "Mobile", engagements: 420 },
      { device: "Tablet", engagements: 60 },
    ],
    os: [
      { os: "windows11", engagements: 48 },
      { os: "macOS", engagements: 50 },
    ],
    browsers: [
      { browser: "chrome", engagements: 45 },
      { browser: "firefox", engagements: 50 },
      { browser: "safari", engagements: 70 },
    ],
    cities: [
      { city: "New York", engagements: 100 },
      { city: "Los Angeles", engagements: 50 },
      { city: "Chicago", engagements: 40 },
      { city: "Houston", engagements: 30 },
    ],
    locations: [
      { id: 1, country: "United States", engagements: 600, percentage: "50%" },
      { id: 2, country: "United Kingdom", engagements: 300, percentage: "20%" },
      { id: 3, country: "Canada", engagements: 180, percentage: "20%" },
      { id: 4, country: "Australia", engagements: 120, percentage: "10%" },
    ],
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const REDIRECT_URL: string = process.env.REDIRECT_URL || "https://eurl.dev";
  const [title, setTitle] = useState<string | null>(fetchLink.title);
  const [shortCode, setShortcode] = useState<string>(fetchLink.short_code);
  const [NoDataSet, setNoDataSet] = useState<number>(0);
  const shortLink: string = `${REDIRECT_URL}/${shortCode}`;

  useEffect(() => {
    setLoading(true);
    getLinkDetailsWithAnalytics(decodeId(params.id).toString()).then((res) => {
      setfetchLink(res.link as linkType);
      setHeaderAnalytics(res.analytics as headerAnalyticsType);
      setLoading(false);
    });
  }, [router, params.id]);

  useEffect(() => {
    setShortcode(fetchLink.short_code);
    setTitle(fetchLink.title);
    headerAnalytics.devices.length == 0 ? setNoDataSet(1) : setNoDataSet(0);
  }, [fetchLink, headerAnalytics]);

  if (loading) {
    return <LinkPageLoading />;
  }

  return (
    <div className="pl-5 md:pl-8 pr-2 pt-12">
      <div
        className="flex cursor-pointer w-fit"
        onClick={() => router.push("/app/links")}
      >
        <ArrowLeft size={20} />
        <h1 className="ml-2 text-sm font-medium">Back to list</h1>
      </div>

      <div className="flex mt-6 py-6 pr-4 flex-col rounded-xl border-[0.5px] shadow-md">
        <div className="flex">
          <div className="flex flex-col ml-6 w-full">
            <div className="flex justify-between ">
              <h1 className="text-xl font-bold md:w-[70%] w-[95%] break-all">
                {title}
              </h1>
              <div className="hidden md:block">
                <Button
                  onClick={() => {
                    copyToClipboard(shortLink);
                  }}
                  variant="outline"
                >
                  <Copy size={15} className="mr-2" />
                  Copy
                </Button>
                <LinkShareDialog shortCode={shortCode} link={fetchLink}>
                  <Button variant="outline" className="ml-2">
                    <Share2 size={15} className="mr-2" />
                    Share
                  </Button>
                </LinkShareDialog>
                <EditLinkDialog
                  setShortcode={setShortcode}
                  setParentTitle={setTitle}
                  link={fetchLink}
                >
                  <Button variant="outline" className="ml-2">
                    <Pencil size={15} className="mr-2" />
                    Edit
                  </Button>
                </EditLinkDialog>
              </div>
            </div>
            <div className="flex mt-3">
              <div className="h-8  w-8 md:h-12 md:w-12 border-[0.5px] shadow-md rounded-full flex justify-center items-center">
                <LinkIcon className="h-4 w-4 md:h-6 md:w-6" />
              </div>
              <div className="ml-4">
                <h1
                  onClick={() => {
                    window.open(shortLink, "_blank");
                  }}
                  className="text-blue-400 mt-1 hover:underline cursor-pointer w-fit"
                >
                  {shortLink}
                </h1>
                <h1
                  onClick={() => {
                    window.open(fetchLink.long_url, "_blank");
                  }}
                  className="mt-2 text-sm hover:underline cursor-pointer w-fit"
                >
                  {fetchLink.long_url.length > 32
                    ? fetchLink.long_url.slice(0, 32) + "...."
                    : fetchLink.long_url}
                </h1>
              </div>
            </div>

            <div className="flex mt-6 md:flex-row flex-col">
              <div className="flex mt-2 md:mt-0">
                <Calendar className="ml-0 md:ml-4 " size={20} />
                <h1 className="text-sm ml-2">
                  {months[fetchLink.created_at.getMonth()]}{" "}
                  {fetchLink.created_at.getDate()}{" "}
                  {fetchLink.created_at.getFullYear()}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 ml-8 md:hidden">
          <Button
            onClick={() => {
              copyToClipboard(shortLink);
            }}
            variant="outline"
          >
            <Copy size={15} />
          </Button>
          <LinkShareDialog shortCode={shortCode} link={fetchLink}>
            <Button variant="outline" className="ml-2">
              <Share2 size={15} />
            </Button>
          </LinkShareDialog>
          <EditLinkDialog
            setShortcode={setShortcode}
            setParentTitle={setTitle}
            link={fetchLink}
          >
            <Button className="ml-2 " variant="outline">
              <Pencil size={15} />
            </Button>
          </EditLinkDialog>
        </div>
      </div>

      <div className="flex md:flex-row flex-col mt-6 mr-0">
        <div className="flex-1 flex justify-between shadow-md p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Engagements</h1>
          <h1 className="text-2xl font-bold">
            {fetchLink._count.click_analytics}
          </h1>
        </div>
        <div className="flex-1 flex justify-between shadow-md ml-0 md:mt-0 mt-4 md:ml-4 p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Last 7 days</h1>
          <h1 className="text-2xl font-bold">
            {headerAnalytics.totalVisitsThisWeek}
          </h1>
        </div>
        <div className="flex-1 flex justify-between shadow-md ml-0 md:mt-0 mt-4 md:ml-4 p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Weekly change</h1>
          <div className="flex items-center">
            <ArrowUpDownIcon size={25} />
            <h1 className="text-2xl font-bold ml-1">
              {headerAnalytics.percentageChange}%
            </h1>
          </div>
        </div>
      </div>
      <div className="mt-6 border-[0.5px] rounded-xl px-3 py-4 shadow-md">
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
            {headerAnalytics.locations.map((location: any) => {
              return (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">{location.id}</TableCell>
                  <TableCell>{location.country}</TableCell>
                  <TableCell className="text-right">
                    {location.engagements}
                  </TableCell>
                  <TableCell className="text-right">
                    {location.percentage}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center md:justify-start">
        <div className="flex md:flex-row flex-col">
          <div className="mt-8 shadow-md p-6 rounded-xl w-fit border-[0.5px]">
            <Label className="font-bold ml-3 text-lg">Devices</Label>
            <div className="mt-6 md:w-[300px] md:h-[300px] w-[250px] h-[250px]">
              {NoDataSet == 1 ? (
                <div>
                  <NoDataLoading />
                </div>
              ) : (
                <PieChart
                  devices={headerAnalytics.devices.map(
                    (device) => device.device
                  )}
                  data={headerAnalytics.devices.map((device) => {
                    return device.engagements;
                  })}
                />
              )}
            </div>
          </div>

          <div className="mt-8 shadow-md p-6 rounded-xl w-fit border-[0.5px] md:ml-8 ml-0">
            <Label className="font-bold ml-3 text-lg">OS</Label>
            <div className="mt-4 md:w-[300px] md:h-[300px] w-[250px] h-[250px]">
              {NoDataSet == 1 ? (
                <div>
                  <NoDataLoading />
                </div>
              ) : (
                <PieChart
                  devices={headerAnalytics.os.map((os) => os.os)}
                  data={headerAnalytics.os.map((os) => os.engagements)}
                />
              )}
            </div>
          </div>

          <div className="mt-8 shadow-md p-6 rounded-xl w-fit border-[0.5px] md:ml-8 ml-0">
            <Label className="font-bold ml-3 text-lg">Browser</Label>
            <div className="mt-4 md:w-[300px] md:h-[300px] w-[250px] h-[250px]">
              {NoDataSet == 1 ? (
                <div>
                  <NoDataLoading />
                </div>
              ) : (
                <PieChart
                  devices={headerAnalytics.browsers.map(
                    (browser) => browser.browser
                  )}
                  data={headerAnalytics.browsers.map(
                    (browser) => browser.engagements
                  )}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-start">
        <div className="mt-8 shadow-md p-6 rounded-xl w-fit border-[0.5px]">
          <Label className="font-bold ml-3 text-lg">City</Label>
          <div className="mt-4 md:w-[300px] md:h-[300px] w-[250px] h-[250px]">
            {NoDataSet == 1 ? (
              <div>
                <NoDataLoading />
              </div>
            ) : (
              <PieChart
                devices={headerAnalytics.cities.map((city) => city.city)}
                data={headerAnalytics.cities.map((city) => city.engagements)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
