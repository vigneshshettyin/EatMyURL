"use client";

import { DatePickerWithRange } from "@/components/DialogComponents/DatePickerWithRange";
import React, { useEffect, useRef, useState } from "react";
import { LinkCard } from "@/components/CardComponents/LinkCard";

import { getLinks } from "@/lib/actions/getLinksAction";
import { DateRange } from "react-day-picker";
import Loading from "./loading";
import { linkType, paginationType } from "@/interfaces/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { pageOrder, paginateOperation } from "@/lib/constants";
import { EmptyLoading } from "@/components/LoadingComponents/EmptyLoading";


export default function Page() {
  const [filteredLinks, setFilteredLinks] = useState<linkType[] | undefined>(
    []
  );
  const linksRef = useRef<HTMLDivElement | null>(null)

  const [loading, setLoading] = useState<Boolean>(true);
  const current_date = new Date();
  const [date, setDate] = React.useState<DateRange | undefined>({
    to: new Date(
      current_date.getFullYear(),
      current_date.getMonth(),
      current_date.getDate() + 1
    ),
    from: new Date(2024, 4, 18),
  });

  const [totalPages, setTotalPages] = useState(0);

  const [paginator, setPaginator] = useState<paginationType>({
    value: 1,
    pageActive: pageOrder.ONE,
  });

  const pagination = (page: pageOrder, action: paginateOperation) => {
    if (
      (page + paginator.value > totalPages && page + paginator.value != 1) ||
      (paginator.pageActive + paginator.value + 1 > totalPages &&
        action == paginateOperation.NEXT)
    ) {
      toast.info("End of the links");
      return;
    }

    if (paginateOperation.NEXT == action) {
      if (paginator.pageActive == pageOrder.ONE) {
        setPaginator((c) => {
          return { ...c, pageActive: pageOrder.TWO };
        });
      } else if (paginator.pageActive == pageOrder.TWO) {
        setPaginator((c) => {
          return { ...c, pageActive: pageOrder.THREE };
        });
      } else {
        setPaginator((c) => {
          return { value: c.value + 1, pageActive: pageOrder.THREE };
        });
      }
    } else if (paginateOperation.PREV == action) {
      if (paginator.pageActive == pageOrder.THREE) {
        setPaginator((c) => {
          return { ...c, pageActive: pageOrder.TWO };
        });
      } else if (paginator.pageActive == pageOrder.TWO) {
        setPaginator((c) => {
          return { ...c, pageActive: pageOrder.ONE };
        });
      } else {
        setPaginator((c) => {
          return {
            value: c.value - Number(c.value != 1),
            pageActive: pageOrder.ONE,
          };
        });
      }
    } else {
      setPaginator((c) => {
        return { ...c, pageActive: page };
      });
    }
    linksRef.current?.scrollIntoView({
      behavior:'smooth'
    })
  };

  useEffect(() => {
    setLoading(true);
    getLinks((paginator.value + paginator.pageActive).toString()).then(
      (res) => {
        const linkList: linkType[] | undefined = res.links;
        setTotalPages(res.total_pages || 0);
        const from: Date | undefined = date?.from;
        const to: Date | undefined = date?.to;
        const filterLinks: linkType[] | undefined = linkList?.filter((link) => {
          return (
            (!from || link.created_at >= from) && (!to || link.created_at <= to)
          );
        });
        setFilteredLinks(filterLinks);
        setLoading(false);
      }
    );
  }, [date, paginator]);

  return (
    <div ref={linksRef} className="pt-10 lg:pl-6 pl-2 w-full pr-2">
      <h1 className="font-bold text-3xl ml-3">Links</h1>
      <div className="flex mt-6 lg:flex-row flex-col">
        <div className="ml-2">
          <DatePickerWithRange
            date={date}
            setDate={setDate}
            current_date={current_date}
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        filteredLinks?.length != 0?
        <div>
          {filteredLinks?.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>:<div><EmptyLoading/></div>
      )}

    {totalPages > 1? <Pagination className="mt-14">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => pagination(0, paginateOperation.PREV)}
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => pagination(pageOrder.ONE, paginateOperation.CLICK)}
              isActive={paginator.pageActive == pageOrder.ONE}
              href="#"
            >
              {paginator.value}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => pagination(pageOrder.TWO, paginateOperation.CLICK)}
              isActive={paginator.pageActive == pageOrder.TWO}
              href="#"
            >
              {paginator.value + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() =>
                pagination(pageOrder.THREE, paginateOperation.CLICK)
              }
              isActive={paginator.pageActive == pageOrder.THREE}
              href="#"
            >
              {paginator.value + 2}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => pagination(0, paginateOperation.NEXT)}
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>:<div></div>}
      
    </div>
  );
}
