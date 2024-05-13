import React from "react";

interface IconsProps {
  icons: React.ElementType;
  className?: string;
}

const Icons: React.FC<IconsProps> = ({
  icons: ReactIconComponent,
  className = "",
}) => {
  return (
    <div className="rounded-2xl border-4 border-neutral-800 p-4">
      <ReactIconComponent className={`text-6xl ${className}`} />
    </div>
  );
};

export default Icons;
