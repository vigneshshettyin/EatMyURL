"use client"

import { DatePickerWithRange } from "@/components/DialogComponents/DatePickerWithRange";
import React from 'react'
import { FilterDialog } from "@/components/DialogComponents/FilterDialog";
import { LinkCard } from "@/components/CardComponents/LinkCard";
import { LinkType } from "@/interfaces/types";

const dummyData: LinkType[] = [
  {
    id: 1,
    title: "Introduction to TypeScript",
    shortLink: "shortlink-1",
    longLink: "https://example.com/longlink-1",
    engagement: 560,
    dateCreated: new Date("2024-04-01T08:00:00")
  },
  {
    id: 2,
    title: "React Hooks Tutorial",
    shortLink: "shortlink-2",
    longLink: "https://example.com/longlink-2",
    engagement: 732,
    dateCreated: new Date("2024-03-29T12:30:00")
  },
  {
    id: 3,
    title: "Node.js Authentication",
    shortLink: "shortlink-3",
    longLink: "https://example.com/longlink-3",
    engagement: 389,
    dateCreated: new Date("2024-02-28T15:45:00")
  },
  {
    id: 4,
    title: "GraphQL Basics",
    shortLink: "shortlink-4",
    longLink: "https://example.com/longlink-4",
    engagement: 891,
    dateCreated: new Date("2024-01-27T11:20:00")
  },
  {
    id: 5,
    title: "Angular Forms",
    shortLink: "shortlink-5",
    longLink: "https://example.com/longlink-5",
    engagement: 643,
    dateCreated: new Date("2023-12-26T09:10:00")
  },
  {
    id: 6,
    title: "Vue.js State Management",
    shortLink: "shortlink-6",
    longLink: "https://example.com/longlink-6",
    engagement: 475,
    dateCreated: new Date("2023-11-25T14:00:00")
  },
  {
    id: 7,
    title: "REST API Design",
    shortLink: "shortlink-7",
    longLink: "https://example.com/longlink-7",
    engagement: 812,
    dateCreated: new Date("2023-10-24T10:05:00")
  },
  {
    id: 8,
    title: "WebSockets Tutorial",
    shortLink: "shortlink-8",
    longLink: "https://example.com/longlink-8",
    engagement: 578,
    dateCreated: new Date("2023-09-23T13:40:00")
  },
  {
    id: 9,
    title: "Docker for Beginners",
    shortLink: "shortlink-9",
    longLink: "https://example.com/longlink-9",
    engagement: 943,
    dateCreated: new Date("2023-08-22T16:55:00")
  },
  {
    id: 10,
    title: "MongoDB Crash Course",
    shortLink: "shortlink-10",
    longLink: "https://example.com/longlink-10",
    engagement: 726,
    dateCreated: new Date("2023-07-21T08:30:00")
  }
];

export default function Page() {

  return (
    <div className="pt-10 pl-6 w-full pr-2">
      <h1 className="font-bold text-3xl ml-3">Links</h1>
      <div className="flex mt-6 md:flex-row flex-col">
        <div className="ml-2">
          <DatePickerWithRange />
        </div>
        <div className="mt-3 md:mt-0 ml-0 md:ml-4">
          <FilterDialog />
        </div>
      </div>

      {dummyData.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
