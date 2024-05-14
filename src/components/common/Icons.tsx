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
    <div className="rounded-2xl border-2 border-neutral-400 p-4 backdrop-filter backdrop-blur-sm bg-white/20">
      <ReactIconComponent className={`text-3xl ${className}`} />
    </div>
  );
};

export default Icons;
