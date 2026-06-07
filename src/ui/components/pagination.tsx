import Link from "next/link";
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { buttonVariants, type ButtonProps } from "@/ui/components/button";
import { cn } from "@/ui/utils";

type LinkHref = React.ComponentProps<typeof Link>["href"];
type LinkPrefetch = React.ComponentProps<typeof Link>["prefetch"];

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      data-slot="pagination"
      role="navigation"
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      data-slot="pagination-content"
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  "aria-label"?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: LinkHref;
  isActive?: boolean;
  prefetch?: LinkPrefetch;
  size?: ButtonProps["size"];
};

function PaginationLink({
  "aria-label": ariaLabel,
  children,
  className,
  disabled = false,
  href,
  isActive,
  prefetch,
  size = "icon",
}: PaginationLinkProps) {
  const linkClassName = cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }),
    className,
  );

  if (disabled || !href) {
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        className={linkClassName}
        data-active={isActive}
        data-disabled="true"
        data-slot="pagination-link"
        role="link"
        tabIndex={-1}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      aria-label={ariaLabel}
      className={linkClassName}
      data-active={isActive}
      data-slot="pagination-link"
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}

function PaginationPrevious({
  className,
  text = "Previous",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label={props["aria-label"] ?? text}
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      size="default"
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" className="size-4" />
      <span>{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  text = "Next",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label={props["aria-label"] ?? text}
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      size="default"
      {...props}
    >
      <span>{text}</span>
      <ChevronRightIcon aria-hidden="true" className="size-4" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      className={cn("flex size-9 items-center justify-center", className)}
      data-slot="pagination-ellipsis"
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
