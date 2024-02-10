import { Image, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const VechainLogo: React.FC = () => {
    const lightModeUrl = "/images/logo/vechain.png";
    const darkModeUrl = "/images/logo/vechain_white.png";
    const logoUrl = useColorModeValue(lightModeUrl, darkModeUrl);

    return <Image h={25} alt="Vechain logo" src={logoUrl} />;
};
