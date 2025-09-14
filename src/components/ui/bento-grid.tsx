import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-border bg-card p-4 transition duration-200 hover:shadow cursor-pointer",
        className,
      )}
    >
      {header}
      <div className="transition duration-200">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-card-foreground">
          {title}
        </div>
        <div className="font-sans text-xs font-medium text-muted-foreground">
          {description}
        </div>
      </div>
    </div>
  )}