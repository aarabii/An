import Image from "next/image";

import { Container } from "@/components/common";
import { PERSONAL_INFO } from "@/constant";
import { Button } from "@/components/ui/button";
import { Fragment } from "react/jsx-runtime";

const Hero = () => {
    return (
        <Container
            id="#"
            className={`flex flex-col items-start justify-center`}
        >
            <div className="flex h-full w-full">
                <div className="p-5">
                    <ImageDiv />
                </div>
                <div className="flex flex-1 flex-col justify-center md:gap-1">
                    <InfoDiv />
                    <CTA />
                </div>
            </div>
        </Container>
    );
};

const ImageDiv = () => {
    return (
        <div className="w-fit rounded-xl border p-1">
            <div className="box-border h-25 w-25 overflow-hidden rounded-lg border bg-primary object-cover p-1 select-none md:h-30 md:w-30">
                <Image
                    src={PERSONAL_INFO.profile_image}
                    alt={PERSONAL_INFO.profile_image_alt}
                    height={120}
                    width={120}
                    priority
                    className="box-border h-full w-full scale-120 object-cover transition-none"
                />
            </div>
        </div>
    );
};

const InfoDiv = () => {
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
        <Fragment>
            <h1 className="flex w-full flex-col text-2xl font-heading text-foreground md:pb-0.5 md:text-3xl">
                {PERSONAL_INFO.name}
            </h1>
            <span className="flex items-center gap-2 text-sm font-para text-foreground/70 md:text-base">
                {PERSONAL_INFO.custom_roles[0]}
            </span>
            <h2 className="text-xs font-mono text-foreground/70">
                {age}, {state}, {country}
            </h2>
        </Fragment>
    );
};

const CTA = () => {
    return (
        <div className="flex items-center justify-start gap-2">
            <Button>Contact Me</Button>
            <Button>View Resume</Button>
        </div>
    );
};

export default Hero;
