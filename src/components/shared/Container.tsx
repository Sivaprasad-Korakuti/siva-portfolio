import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className = "", id }: ContainerProps) {
  return (
    <div
      id={id}
      className={`w-full max-w-[1140px] mx-auto px-6 md:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
