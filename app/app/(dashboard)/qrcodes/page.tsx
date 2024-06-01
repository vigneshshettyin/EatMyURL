"use client";

import { QRCodeCardComponent } from "@/components/CardComponents/QRCodeCardComponent";
import { QRCodeType, linkType, paginationType } from "@/interfaces/types";
import { getLinks } from "@/lib/actions/getLinksAction";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { pageOrder, paginateOperation } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function QRCodePage() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [links, setLinks] = useState<linkType[] | undefined>([]);

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
      toast({
        title: "End of the links",
        description: "That's all we have",
      });
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
  };

  useEffect(() => {
    setLoading(true);
    getLinks((paginator.value + paginator.pageActive).toString()).then(
      (res) => {
        const linkList: linkType[] | undefined = res.links;
        setTotalPages(res.total_pages || 0);
        setLinks(linkList);
        setLoading(false);
      }
    );
  }, [paginator]);

  return (
    <div className="pr-6 pl-4 md:pl-8 pt-8">
      <Label className="text-3xl font-bold">QR Codes</Label>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {links?.map((qr) => (
            <QRCodeCardComponent key={qr.id} qrcode={qr} />
          ))}

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
      )}
    </div>
  );
}
