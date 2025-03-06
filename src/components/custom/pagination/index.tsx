import { cn } from "@/components/lib/utils";
import { MAX_PAGE_TO_DISPLAY } from "@/lib/constants";
import { PageInfo } from "@/lib/types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";

type PaginationProps = {
  pageInfo: PageInfo;
  setPage: Dispatch<SetStateAction<number>>;
};

function Pagination({ pageInfo, setPage }: PaginationProps) {
  const { number, total_pages, first, last } = pageInfo;

  const getDisplayedPages = () => {
    let startPage = Math.max(0, number - Math.floor(MAX_PAGE_TO_DISPLAY / 2));
    const endPage = Math.min(
      total_pages - 1,
      startPage + MAX_PAGE_TO_DISPLAY - 1
    );

    if (endPage - startPage + 1 < MAX_PAGE_TO_DISPLAY) {
      startPage = Math.max(0, endPage - MAX_PAGE_TO_DISPLAY + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const displayedPages = getDisplayedPages();
  const showLeftDots = displayedPages[0] > 0;
  const showRightDots =
    displayedPages[displayedPages.length - 1] < total_pages - 1;

  return (
    <div className="flex justify-center w-full flex-row items-center gap-2">
      <DoubleArrowLeftIcon
        onClick={() => setPage(0)}
        className={cn(
          "cursor-pointer",
          first && "invisible pointer-events-none"
        )}
      />
      <ChevronLeftIcon
        onClick={() => setPage(number - 1)}
        className={cn(
          "cursor-pointer",
          first && "invisible pointer-events-none"
        )}
      />
      <>
        {showLeftDots && <span className="p-2 mx-1">...</span>}
        {displayedPages.map((pageIndex) => {
          const isCurrentPage = number === pageIndex;
          return (
            <button
              key={pageIndex}
              className={cn(
                "p-2 mx-1",
                isCurrentPage ? "text-focused font-bold" : "text-primary"
              )}
              onClick={() => setPage(pageIndex)}
            >
              {pageIndex + 1}
            </button>
          );
        })}
        {showRightDots && <span className="p-2 mx-1">...</span>}
      </>
      <ChevronRightIcon
        onClick={() => setPage(number + 1)}
        className={cn(
          "cursor-pointer",
          last && "invisible pointer-events-none"
        )}
      />
      <DoubleArrowRightIcon
        onClick={() => setPage(total_pages - 1)}
        className={cn(
          "cursor-pointer",
          last && "invisible pointer-events-none"
        )}
      />
    </div>
  );
}

export default Pagination;
