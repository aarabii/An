"use client";

import { Separator } from "@/components/ui/separator";

import { FirstName } from "./_components/FirstName";
import { NavigationColumn } from "./_components/NavigationColumn";
import { SocialColumn } from "./_components/SocialColumn";
import { ConnectColumn } from "./_components/ConnectColumn";
import { LastName } from "./_components/LastName";
import { CopyrightBar } from "./_components/CopyrightBar";

export const Footer = () => {
  return (
    <footer className="w-full bg-black/80 backdrop-blur-2xl text-foreground pt-8 pb-8 px-4 sm:px-8 md:px-12 border-t border-border/40">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Top Section Grid & Flex Ordering */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-0">
          {/* Navigation Column */}
          <div className="order-1 md:order-2 w-full md:w-[18%] flex flex-col justify-start">
            <NavigationColumn />
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block order-2 md:order-3 mx-4 lg:mx-6 self-stretch min-h-50"
          />

          {/* Social Column */}
          <div className="order-2 md:order-4 w-full md:w-[18%] flex flex-col justify-start">
            <SocialColumn />
          </div>

          <Separator
            orientation="vertical"
            className="hidden md:block order-3 md:order-5 mx-4 lg:mx-6 self-stretch min-h-50"
          />

          {/* Connect Column */}
          <div className="order-3 md:order-6 w-full md:w-[18%] flex flex-col justify-between">
            <ConnectColumn />
          </div>

          {/* First Name Column (Includes top-left scroll to top icon) */}
          <div className="order-4 md:order-1 w-full md:w-[38%] flex flex-col justify-between">
            <FirstName />
          </div>
        </div>

        {/* Middle Section: Large Stretched Last Name */}
        <LastName />

        {/* Horizontal Separator with Signature in Middle */}
        <Separator orientation="horizontal" showSignature className="my-6" />

        {/* Bottom Section: Rounded-md Container with Mono Text */}
        <CopyrightBar />
      </div>
    </footer>
  );
};

export default Footer;
