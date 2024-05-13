import React, { FC } from "react";
import { ToolTip } from "./ToolTip";

interface NavIconsProps {
  icons: React.ElementType;
  className?: string;
  href?: string;
  tooltip?: string;
}

export const NavIcons: FC<NavIconsProps> = ({
  icons: ReactIconsCompoents,
  className = "",
  href = "#",
  tooltip = "",
}) => {
  return (
    <ToolTip
      content={tooltip}
      placement="bottom"
      className="inline-block relative"
    >
      <a rel="noreferrer noopener" target="_blank" href={href} className="text-fuchsia-200">
        <ReactIconsCompoents className={className} />
      </a>
    </ToolTip>
  );
};
