import { cn } from "@/lib/utils";
import * as React from "react";
import { Link } from "react-router";
import { buttonVariants } from "../Button";
import { Icon } from "../Icon";

type Props = {
  title: React.ReactNode;
  paths: { name: string; href: string }[];
  action?: React.ReactNode;
  showBackButton?: boolean;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
};
export default function Heading({ title, paths, action, showBackButton, wrapperProps }: Props) {
  const currentPathname = React.useMemo(() => window.location.pathname, []);
  const { className: wrapperClassName, ...restWrapperProps } = wrapperProps ?? {};

  return (
    <div className={cn("flex items-center justify-between w-full", wrapperClassName)} {...restWrapperProps}>
      <div className="flex gap-4">
        {showBackButton && (
          <Link
            to="/form"
            className={buttonVariants({
              size: "icon",
            })}
          >
            <Icon name="ChevronLeft" />
          </Link>
        )}
        <div className="flex flex-col gap-1">
          <h2 className="text-[28px] leading-[38.13px] tracking-[0.25%] font-bold text-form-foreground">{title}</h2>
          <div className="flex items-center gap-1">
            {paths.map((path, index) => (
              <React.Fragment key={`path-${index}`}>
                <Link
                  to={path.href}
                  className={cn(
                    "text-sm leading-5 tracking-[0.25%] text-form-muted-foreground hover:text-form-primary/10 transition",
                    currentPathname.toLowerCase() === path.href.toLowerCase() &&
                      "text-form-primary cursor-default pointer-events-none"
                  )}
                >
                  {path.name}
                </Link>
                {index !== paths.length - 1 && (
                  <Icon name="ChevronRight" className="stroke-form-primary size-[18px] p-0.5" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {action}
    </div>
  );
}
