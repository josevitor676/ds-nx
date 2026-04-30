import { IconChevronLeft, IconChevronRight, IconDots } from "@tabler/icons-react";
import { type VariantProps } from "class-variance-authority";
import React from "react";
import { cn } from "../../../lib/utils";
import { IconButton } from "../../Atoms/IconButton/IconButton";
import { pageButtonVariants, paginationVariants } from "./pagination.variants";

export interface PaginationProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof paginationVariants> {
  current?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  /** Permite digitar a página atual (mostra input "1 de 50") */
  editable?: boolean;
  showArrows?: boolean;
  className?: string;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      current = 1,
      total = 1,
      onPageChange,
      showArrows = true,
      editable = false,
      className,
      ...props
    },
    ref,
  ) => {
    const pages = Math.max(1, total);
    const normalizedCurrent = Math.min(Math.max(1, current), pages);
    const [inputValue, setInputValue] = React.useState<string>(
      String(normalizedCurrent),
    );

    React.useEffect(() => {
      setInputValue(String(normalizedCurrent));
    }, [normalizedCurrent]);

    const handleClick = (p: number) => {
      if (p < 1 || p > pages || p === normalizedCurrent) return;
      onPageChange?.(p);
    };

    const renderPage = (p: number) => {
      const variant = p === normalizedCurrent ? "active" : "clear";
      return (
        <button
          key={p}
          type="button"
          aria-current={p === normalizedCurrent ? "page" : undefined}
          className={cn(
            pageButtonVariants({ variant }),
            "ds-h-8 ds-w-8 ds-text-sm ds-rounded ds-font-medium",
          )}
          onClick={() => handleClick(p)}
        >
          {p}
        </button>
      );
    };

    // simple range for now: show first, prev, current-1,current,current+1, next, last when possible
    // build page buttons (unless editable mode is requested)
    const pagesItems: React.ReactNode[] = [];
    if (!editable) {
      if (pages <= 5) {
        for (let i = 1; i <= pages; i++) pagesItems.push(renderPage(i));
      } else {
        pagesItems.push(renderPage(1));
        if (normalizedCurrent > 3)
          pagesItems.push(
            <div key="dots1" className="ds-flex ds-items-center ds-justify-center ds-h-8 ds-w-8 ds-text-neutral-600">
              <IconDots size={20} />
            </div>,
          );
        const start = Math.max(2, normalizedCurrent - 1);
        const end = Math.min(pages - 1, normalizedCurrent + 1);
        for (let i = start; i <= end; i++) pagesItems.push(renderPage(i));
        if (normalizedCurrent < pages - 2)
          pagesItems.push(
            <div key="dots2" className="ds-flex ds-items-center ds-justify-center ds-h-8 ds-w-8 ds-text-neutral-600">
              <IconDots size={20} />
            </div>,
          );
        pagesItems.push(renderPage(pages));
      }
    }

    const items: React.ReactNode[] = [];
    if (showArrows) {
      items.push(
        <IconButton
          key="prev"
          aria-label="Página anterior"
          icon={<IconChevronLeft />}
          variant="clear"
          colorVariant="neutral"
          size="md"
          disabled={normalizedCurrent === 1}
          onClick={() => handleClick(normalizedCurrent - 1)}
        />,
      );
    }

    if (editable) {
      // In editable mode show only current input + "de total" (no pages or dots)
      if (pages > 1) {
        items.push(
          <div
            key="total"
            className="ds-flex ds-items-center ds-gap-2 ds-ml-2 ds-mr-2"
          >
            <input
              aria-label="Página atual"
              type="number"
              min={1}
              max={pages}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const v = Number(inputValue || 0);
                  const next = Math.min(Math.max(1, Math.trunc(v || 0)), pages);
                  if (next !== normalizedCurrent) onPageChange?.(next);
                }
              }}
              onBlur={() => {
                const v = Number(inputValue || 0);
                const next = Math.min(Math.max(1, Math.trunc(v || 0)), pages);
                if (next !== normalizedCurrent) onPageChange?.(next);
                setInputValue(String(next));
              }}
              className="ds-h-8 ds-w-[60px] ds-text-sm ds-text-neutral-600 ds-text-center ds-rounded ds-border ds-border-neutral-200 ds-bg-white"
            />
            <div className="ds-text-sm ds-text-neutral-600">de {total}</div>
          </div>,
        );
      }
    } else {
      items.push(...pagesItems);
    }

    if (showArrows) {
      items.push(
        <IconButton
          key="next"
          aria-label="Próxima página"
          icon={<IconChevronRight />}
          variant="clear"
          colorVariant="neutral"
          size="md"
          disabled={normalizedCurrent === pages}
          onClick={() => handleClick(normalizedCurrent + 1)}
        />,
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          paginationVariants(),
          "ds-gap-2 ds-items-center",
          className,
        )}
        {...props}
      >
        {items}
      </div>
    );
  },
);

Pagination.displayName = "Pagination";

export default Pagination;
