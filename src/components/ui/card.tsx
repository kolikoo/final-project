import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`p-6 border border-gray-200 rounded-lg w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
