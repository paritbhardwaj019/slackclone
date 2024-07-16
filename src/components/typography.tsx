import { cn } from "@/lib/utils";
import { createElement, HTMLAttributes, ReactNode } from "react";

type TypographyProps = {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLElement>;

const CLASS_NAMES = {
  h1: "scroll-m-20 text-4xl font-extra-bold tracking-tight lg:text-5xl",
  h2: "scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl",
  h3: "scroll-m-12 text-2xl font-semibold tracking-tight lg:text-3xl",
  h4: "scroll-m-10 text-xl font-normal tracking-tight lg:text-2xl",
  h5: "scroll-m-8 text-lg font-normal tracking-tight lg:text-xl",
  h6: "scroll-m-6 text-base font-normal tracking-tight lg:text-lg",
  p: "scroll-m-4 text-sm font-normal tracking-tight lg:text-base",
};

export const Typography = ({
  variant = "h1",
  className,
  children,
  ...rest
}: TypographyProps) => {
  const defaultClassName = CLASS_NAMES[variant];

  return createElement(
    variant,
    { className: cn(defaultClassName, className), ...rest },
    children
  );
};
