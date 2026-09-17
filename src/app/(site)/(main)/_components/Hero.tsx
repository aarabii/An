import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common";
import { PERSONAL_INFO } from "@/constant";
import { Button } from "@/components/ui/button";
import { AnimatedRoles } from "@/components/misc";

const Hero = () => {
  return (
    <Container
      id="hero"
      className="flex flex-col items-start justify-center pt-2 sm:pt-4 lg:pt-6"
    >
      <div className="flex flex-row items-stretch gap-3 sm:gap-4 w-full">
        <ImageDiv />
        <RightCol />
      </div>
    </Container>
  );
};

const ImageDiv = () => {
  return (
    <div className="shrink-0 rounded-xl border border-border p-1 bg-card/40">
      <div className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 overflow-hidden rounded-lg border border-border bg-muted select-none">
        <Image
          src={PERSONAL_INFO.profile_image}
          alt={PERSONAL_INFO.profile_image_alt}
          height={160}
          width={160}
          priority
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

const RightCol = () => {
  const { d, m, y } = PERSONAL_INFO.DOB;
  const { state, country } = PERSONAL_INFO.location;

  const today = new Date();
  const age =
    today.getFullYear() -
    y -
    (today.getMonth() + 1 < m ||
    (today.getMonth() + 1 === m && today.getDate() < d)
      ? 1
      : 0);

  return (
    <div className="flex flex-1 min-w-0 flex-col justify-between py-1">
      <div className="flex flex-col gap-0.5 min-w-0">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight truncate">
          {PERSONAL_INFO.name}
        </h1>
        <AnimatedRoles roles={PERSONAL_INFO.custom_roles} />
      </div>

      <p className="text-sm font-mono text-muted-foreground truncate">
        {age}, {state}, {country}
      </p>

      <CTA />
    </div>
  );
};

const CTA = () => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-start gap-1.5 sm:gap-2">
      <Button
        className="py-2"
        nativeButton={false}
        render={<a href="#contact" />}
      >
        Contact Me
      </Button>
      <Button
        className="py-2"
        variant="outline"
        nativeButton={false}
        render={<Link href="/resume" />}
      >
        View Resume
      </Button>
    </div>
  );
};

export default Hero;
