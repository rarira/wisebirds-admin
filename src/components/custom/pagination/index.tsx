import { cn } from "@/components/lib/utils";
import { MAX_PAGE_TO_DISPLAY } from "@/lib/constants";
import { PageInfo } from "@/lib/types";
import {
  FaAnglesLeft,
  FaAngleLeft,
  FaAnglesRight,
  FaAngleRight,
} from "react-icons/fa6";

type PaginationProps = {
  pageInfo: PageInfo;
  setPage: (page: number) => void;
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

  const getArrowClassName = (disabled: boolean) =>
    cn(
      "cursor-pointer",
      disabled && "text-gray-300 pointer-events-none cursor-not-allowed"
    );

  return (
    <div className="flex justify-center w-full flex-row items-center gap-2">
      <FaAnglesLeft
        onClick={() => setPage(0)}
        className={getArrowClassName(first)}
      />
      <FaAngleLeft
        onClick={() => setPage(number - 1)}
        className={getArrowClassName(first)}
      />
      <>
        {showLeftDots && <span className="p-2 mx-1">...</span>}
        {displayedPages.map((pageIndex) => {
          const isCurrentPage = number === pageIndex;
          return (
            <button
              key={pageIndex}
              className={cn(
                "p-2 mx-1 font-semibold",
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
      <FaAngleRight
        onClick={() => setPage(number + 1)}
        className={getArrowClassName(last)}
      />
      <FaAnglesRight
        onClick={() => setPage(total_pages - 1)}
        className={getArrowClassName(last)}
      />
    </div>
  );
}

export default Pagination;
