import { PropsWithChildren } from "react";

type HeadingProps = PropsWithChildren<{
  level?: 1 | 2 | 3;
  className?: string;
}>;

const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizeClass = {
    1: "text-2xl font-semibold",
    2: "font-semibold",
    3: "text-sm font-semibold",
  }[level];

  return <Tag className={`${sizeClass} ${className}`}>{children}</Tag>;
};

export default Heading;
