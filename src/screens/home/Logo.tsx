import {Text, Spacer} from "@nextui-org/react"
import React from "react";
import { Image } from "@nextui-org/react";

export const Logo = () => {
    return (
        <Image
            width={320}
            height={180}
            src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
            alt="Default Image"
            objectFit="cover"
        />
    );
}